
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
import { Loader2, ArrowLeft, Save, Eye } from 'lucide-react';

type Page = Database['public']['Tables']['pages']['Row'];

const pageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  meta_description: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().default(false),
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
  
  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: '',
      slug: '',
      meta_description: '',
      content: '',
      published: false,
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
        });
        setOriginalSlug(data.slug);
      }
      
      setInitialLoading(false);
    };
    
    fetchPage();
  }, [id, navigate, toast]);

  const onSubmit = async (values: PageFormValues) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Check for duplicate slug if creating new page or changing slug
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
        ...values,
        user_id: user.id,
      };
      
      let result;
      
      if (id) {
        // Update existing page
        result = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);
      } else {
        // Create new page
        result = await supabase
          .from('pages')
          .insert(pageData); // Fix: No longer wrap pageData in an array
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
                          // Only auto-generate slug if it's a new page or slug is empty
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
                      // Preview functionality - open new tab with the page URL
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
    </div>
  );
};

export default PageEditor;
