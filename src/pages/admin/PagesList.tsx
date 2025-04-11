import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';
import { 
  Edit, 
  Eye, 
  Trash2, 
  Plus, 
  Search,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Page = Database['public']['Tables']['pages']['Row'];

const PagesList = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);
  const { toast } = useToast();

  const fetchPages = async () => {
    setLoading(true);
    let query = supabase.from('pages').select('*').order('updated_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      toast({
        title: "Error fetching pages",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error fetching pages:", error);
    } else {
      console.log("Pages fetched successfully:", data);
      setPages(data);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDeletePage = async () => {
    if (!pageToDelete) return;
    
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', pageToDelete.id);
    
    if (error) {
      toast({
        title: "Error deleting page",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error deleting page:", error);
    } else {
      toast({
        title: "Page deleted",
        description: `"${pageToDelete.title}" has been deleted.`,
      });
      fetchPages();
    }
    
    setPageToDelete(null);
  };

  const handlePublishToggle = async (page: Page) => {
    const newPublishedState = !page.published;
    
    const { error } = await supabase
      .from('pages')
      .update({ published: newPublishedState })
      .eq('id', page.id);
    
    if (error) {
      toast({
        title: "Error updating page",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error updating page published state:", error);
    } else {
      toast({
        title: newPublishedState ? "Page published" : "Page unpublished",
        description: `"${page.title}" is now ${newPublishedState ? "published" : "unpublished"}.`,
      });
      
      if (newPublishedState) {
        toast({
          title: "Page is now live",
          description: `View at /${page.slug}`
        });
      }
      
      fetchPages();
    }
  };

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">Pages</h2>
        <Button asChild>
          <Link to="/admin/new-page">
            <Plus className="mr-2 h-4 w-4" />
            New Page
          </Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-10">Loading pages...</div>
        ) : filteredPages.length === 0 ? (
          <div className="text-center py-10">
            {searchQuery ? (
              <p>No pages found matching "{searchQuery}"</p>
            ) : (
              <>
                <p className="mb-4">No pages found. Create your first page.</p>
                <Button asChild>
                  <Link to="/admin/new-page">Create New Page</Link>
                </Button>
              </>
            )}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{page.title}</div>
                    <div className="text-sm text-gray-500">/{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.updated_at || '').toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/pages/${page.id}`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      
                      <Button 
                        variant={page.published ? "destructive" : "outline"} 
                        size="sm"
                        onClick={() => handlePublishToggle(page)}
                      >
                        {page.published ? (
                          <>
                            <XCircle className="h-4 w-4 mr-1" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Publish
                          </>
                        )}
                      </Button>
                      
                      {page.published && (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPageToDelete(page)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the page "{pageToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePage} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PagesList;
