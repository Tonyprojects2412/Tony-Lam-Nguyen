
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Database } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";

type Page = Database['public']['Tables']['pages']['Row'];

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      setLoading(true);
      setNotFound(false);
      
      console.log(`Fetching page with slug: ${slug}`);
      
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
      
        console.log('Fetched page data:', data);
        console.log('Error if any:', error);
        
        if (error || !data) {
          console.error('Error fetching page:', error);
          setNotFound(true);
          toast.error(`Page not found: ${slug}`);
        } else {
          setPage(data);
          
          // Set page metadata
          document.title = `${data.title} | Your Website`;
          
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
        console.error('Unexpected error fetching page:', err);
        setNotFound(true);
        toast.error('Failed to load page. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPage();
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
        ) : page ? (
          <div>
            {page.featured_image && (
              <div className="relative w-full h-64 md:h-96 bg-gray-200 mb-8">
                <img 
                  src={page.featured_image} 
                  alt={page.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="container-custom absolute inset-0 flex items-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{page.title}</h1>
                </div>
              </div>
            )}
            
            <div className="container-custom py-12">
              {!page.featured_image && (
                <h1 className="text-4xl md:text-5xl font-bold mb-8">{page.title}</h1>
              )}
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: page.content || '' }}
              />
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default DynamicPage;
