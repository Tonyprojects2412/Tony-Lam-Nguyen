
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Loader2, Calendar, Clock, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Page = Database['public']['Tables']['pages']['Row'];

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readTime, setReadTime] = useState("5 min read");

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      setNotFound(false);
      
      console.log(`Fetching blog post with slug: ${slug}`);
      
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        
        console.log('Fetched blog post data:', data);
        
        if (error || !data) {
          console.error('Error fetching blog post:', error);
          setNotFound(true);
          toast("Blog post not found");
        } else {
          setPage(data);
          
          // Calculate read time based on content length
          if (data.content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const words = textContent.trim().split(/\s+/).length;
            const readingTime = Math.max(3, Math.ceil(words / 200)); // Assume 200 words per minute
            setReadTime(`${readingTime} min read`);
          }
          
          // Set page title
          document.title = `${data.title} | Blog`;
        }
      } catch (err) {
        console.error('Unexpected error fetching blog post:', err);
        setNotFound(true);
        toast("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [slug]);

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Navbar />
      <main>
        {loading ? (
          <div className="container-custom py-16 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <p>Loading blog post...</p>
          </div>
        ) : page ? (
          <>
            {/* Header */}
            <div className="bg-gray-50 py-10">
              <div className="container-custom">
                <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Blog
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{page.title}</h1>
                {page.meta_description && (
                  <p className="text-xl text-gray-600 max-w-3xl mb-6">{page.meta_description}</p>
                )}
                <div className="flex items-center text-gray-500 text-sm gap-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(page.created_at || '').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Admin
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="container-custom py-12">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: page.content || '' }}
                />
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-gray-50 py-12">
              <div className="container-custom text-center">
                <h2 className="text-2xl font-bold mb-4">Want to learn more?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Discover how our consulting services can help your business implement effective AI strategies.
                </p>
                <Button asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
