import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import WysiwygEditor from '@/components/editor/WysiwygEditor';
import { Database } from '@/integrations/supabase/types';
import { Loader2, ArrowLeft, Save, Eye, Upload, ImageIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type Page = Database['public']['Tables']['pages']['Row'];

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  meta_description: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().default(false),
  featured_image: z.string().optional(),
});

type PageFormValues = z.infer<typeof pageSchema>;

const PageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [originalSlug, setOriginalSlug] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: '',
      slug: '',
      meta_description: '',
      content: '',
      published: false,
      featured_image: '',
    },
  });

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) {
        setInitialLoading(false);
        return;
      }
      
      setInitialLoading(true);
      
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        toast({
          title: "Error fetching page",
          description: error.message,
          variant: "destructive",
        });
        navigate('/admin/pages');
        return;
      }
      
      if (data) {
        form.reset({
          title: data.title,
          slug: data.slug,
          meta_description: data.meta_description || '',
          content: data.content || '',
          published: data.published || false,
          featured_image: data.featured_image || '',
        });
        setOriginalSlug(data.slug);
        
        if (data.featured_image) {
          setPreviewImageUrl(data.featured_image);
        }
      }
      
      setInitialLoading(false);
    };
    
    fetchPage();
  }, [id, navigate, toast, form]);

  const onSubmit = async (values: PageFormValues) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      if (!id || values.slug !== originalSlug) {
        const { count } = await supabase
          .from('pages')
          .select('*', { count: 'exact', head: true })
          .eq('slug', values.slug);
        
        if (count && count > 0) {
          form.setError('slug', {
            type: 'manual',
            message: 'This slug is already in use. Please choose another.',
          });
          setLoading(false);
          return;
        }
      }
      
      const pageData = {
        title: values.title,
        slug: values.slug,
        content: values.content,
        meta_description: values.meta_description,
        published: values.published,
        user_id: user.id,
        featured_image: values.featured_image,
      };
      
      let result;
      
      if (id) {
        result = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
      } else {
        result = await supabase
          .from('pages')
          .insert(pageData);
      }
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      toast({
        title: id ? "Page updated" : "Page created",
        description: `"${values.title}" has been ${id ? 'updated' : 'created'} successfully.`,
      });
      
      navigate('/admin/pages');
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error saving page",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const generateSlugFromTitle = () => {
    const title = form.getValues('title');
    if (!title) return;
    
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    form.setValue('slug', slug, { shouldValidate: true });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    setUploadProgress(0);
    setUploadDialogOpen(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `pages/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            if (progress.total) {
              setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
            }
          },
        });
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);
      
      form.setValue('featured_image', publicUrl, { shouldValidate: true });
      setPreviewImageUrl(publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "The image has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image.",
        variant: "destructive",
      });
    } finally {
      setUploadDialogOpen(false);
    }
  };

  const removeImage = () => {
    form.setValue('featured_image', '', { shouldValidate: true });
    setPreviewImageUrl(null);
    toast({
      title: "Image removed",
      description: "The featured image has been removed.",
    });
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/admin/pages')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pages
        </Button>
        <h2 className="text-3xl font-bold">{id ? 'Edit Page' : 'Create New Page'}</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter page title" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          if (!id || !form.getValues('slug')) {
                            generateSlugFromTitle();
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      The title of your page as it will appear in the browser tab.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="text-gray-500">/</div>
                        <FormControl>
                          <Input 
                            placeholder="page-url-slug" 
                            {...field}
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateSlugFromTitle}
                          className="whitespace-nowrap"
                          disabled={!form.getValues('title')}
                        >
                          Generate from Title
                        </Button>
                      </div>
                      <FormDescription>
                        The URL path where this page will be accessible.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="featured_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <div className="flex flex-col space-y-4">
                    {previewImageUrl ? (
                      <div className="relative group">
                        <img 
                          src={previewImageUrl} 
                          alt="Featured" 
                          className="w-full max-h-64 object-cover rounded-md border" 
                        />
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center bg-gray-50">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Upload a featured image for your page
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {previewImageUrl ? 'Change Image' : 'Upload Image'}
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <input type="hidden" {...field} />
                    </div>

                    <FormDescription>
                      Upload an image to display at the top of your page.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description for search engines" 
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description (150-160 characters) for SEO purposes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Content</FormLabel>
                  <FormControl>
                    <WysiwygEditor 
                      content={field.value || ''} 
                      onChange={field.onChange} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Publish Page
                    </FormLabel>
                    <FormDescription>
                      When enabled, this page will be publicly visible on your website.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/pages')}
              >
                Cancel
              </Button>
              
              <div className="flex space-x-2">
                {form.getValues('published') && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      const slug = form.getValues('slug');
                      if (slug) {
                        window.open(`/${slug}`, '_blank');
                      }
                    }}
                    disabled={!form.getValues('slug')}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                )}
                
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Page
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uploading Image</DialogTitle>
            <DialogDescription>
              Please wait while your image is being uploaded...
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-in-out" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-center mt-2">{uploadProgress}%</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageEditor;
