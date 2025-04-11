
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Database } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';

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
      
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error || !data) {
        console.error('Error fetching page:', error);
        setNotFound(true);
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
      
      setLoading(false);
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
          <div className="container-custom py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">{page.title}</h1>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content || '' }}
            />
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default DynamicPage;
