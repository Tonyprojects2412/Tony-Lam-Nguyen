
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Database } from '@/integrations/supabase/types';
import { Loader2, Calendar, Clock, User, ChevronLeft } from 'lucide-react';
import { toast } from "sonner";

type Page = Database['public']['Tables']['pages']['Row'];

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      setLoading(true);
      setNotFound(false);
      
      console.log(`Fetching blog with id: ${slug}`);
      
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('id', slug)
          .eq('published', true)
          .single();
      
        console.log('Fetched blog data:', data);
        
        if (error || !data) {
          console.error('Error fetching blog:', error);
          setNotFound(true);
          toast.error(`Blog post not found`);
        } else {
          setBlog(data);
          
          // Set page metadata
          document.title = `${data.title} | Your Blog`;
          
          // Update meta description if available
          if (data.meta_description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute('content', data.meta_description);
            } else {
              const meta = document.createElement('meta');
              meta.name = 'description';
              meta.content = data.meta_description;
              document.head.appendChild(meta);
            }
          }
        }
      } catch (err) {
        console.error('Unexpected error fetching blog:', err);
        setNotFound(true);
        toast.error('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug]);

  if (notFound) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <Navbar />
      <main>
        {loading ? (
          <div className="container-custom py-16 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : blog ? (
          <article>
            {blog.featured_image && (
              <div className="relative w-full h-64 md:h-96 bg-gray-200">
                <img 
                  src={blog.featured_image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="container-custom absolute inset-0 flex flex-col justify-center">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
                    <div className="flex items-center text-white/80 text-sm gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(blog.created_at || '').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {Math.ceil((blog.content?.length || 0) / 1000)} min read
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        Admin
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="container-custom py-12">
              <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Blog
              </Link>
              
              {!blog.featured_image && (
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
                  <div className="flex items-center text-gray-500 text-sm gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(blog.created_at || '').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {Math.ceil((blog.content?.length || 0) / 1000)} min read
                    </div>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Admin
                    </div>
                  </div>
                </div>
              )}
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content || '' }}
              />
            </div>
          </article>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
