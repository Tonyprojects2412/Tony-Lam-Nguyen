
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, Settings } from 'lucide-react';

type Page = Database['public']['Tables']['pages']['Row'];

const AdminDashboard = () => {
  const [recentPages, setRecentPages] = useState<Page[]>([]);
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch stats
      const { count: publishedCount } = await supabase
        .from('pages')
        .select('*', { count: 'exact', head: true })
        .eq('published', true);
      
      const { count: draftCount } = await supabase
        .from('pages')
        .select('*', { count: 'exact', head: true })
        .eq('published', false);
      
      // Fetch recent pages
      const { data: recentPages } = await supabase
        .from('pages')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(5);
      
      if (publishedCount !== null) setPublishedCount(publishedCount);
      if (draftCount !== null) setDraftCount(draftCount);
      if (recentPages !== null) setRecentPages(recentPages);
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Pages</CardTitle>
            <CardDescription>All content pages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{publishedCount + draftCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Published</CardTitle>
            <CardDescription>Live pages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{publishedCount}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Drafts</CardTitle>
            <CardDescription>Unpublished pages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{draftCount}</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Pages</h3>
        {recentPages.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <FileText className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No pages yet</h3>
            <p className="mt-1 text-gray-500">Get started by creating your first page</p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/admin/new-page">Create a New Page</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                {recentPages.map((page) => (
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
                            <Settings className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        {page.published && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t">
              <Button variant="outline" asChild>
                <Link to="/admin/pages">View All Pages</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
