
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostCard, { BlogPostProps } from "@/components/blog/BlogPost";
import BlogSidebar from "@/components/blog/BlogSidebar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Page = Database['public']['Tables']['pages']['Row'];

const Blog = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPostProps[]>([]);
  
  const categories = [{
    name: "AI Strategy",
    count: 3
  }, {
    name: "Business",
    count: 5
  }, {
    name: "Healthcare",
    count: 2
  }, {
    name: "AI Implementation",
    count: 4
  }, {
    name: "Data Analytics",
    count: 3
  }, {
    name: "Leadership",
    count: 2
  }, {
    name: "AI Ethics",
    count: 1
  }, {
    name: "Digital Transformation",
    count: 2
  }, {
    name: "Supply Chain",
    count: 1
  }];

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      
      try {
        console.log("Fetching blog posts from Supabase...");
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        console.log("Fetched pages data:", data);
        
        if (error) {
          console.error("Error fetching blog posts:", error);
          toast("Error loading blog posts");
          setBlogPosts([]);
          setLoading(false);
          return;
        }
        
        if (data && Array.isArray(data)) {
          const posts = data.map((page: Page): BlogPostProps => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = page.content || '';
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
            
            const titleLower = page.title.toLowerCase();
            const assignedCategories: string[] = [];
            
            if (titleLower.includes('ai') || titleLower.includes('artificial intelligence')) {
              assignedCategories.push('AI Strategy');
            }
            if (titleLower.includes('business') || titleLower.includes('strategy')) {
              assignedCategories.push('Business');
            }
            if (titleLower.includes('health') || titleLower.includes('medical')) {
              assignedCategories.push('Healthcare');
            }
            if (titleLower.includes('data') || titleLower.includes('analytics')) {
              assignedCategories.push('Data Analytics');
            }
            
            if (assignedCategories.length === 0) {
              assignedCategories.push('Business');
            }
            
            // Use the page's featured_image if available, otherwise use the default image
            const image = page.featured_image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
            
            return {
              id: page.slug,
              title: page.title,
              excerpt: page.meta_description || excerpt,
              date: new Date(page.created_at || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              readTime: `${Math.max(3, Math.ceil(textContent.length / 1000))} min read`,
              author: "Admin",
              image: image,
              featured: page.slug === (data[0]?.slug || ''),
              categories: assignedCategories
            };
          });
          
          setBlogPosts(posts);
          console.log("Transformed blog posts:", posts);
        } else {
          console.warn("No blog posts data or data is not an array");
          setBlogPosts([]);
        }
      } catch (err) {
        console.error("Unexpected error fetching blog posts:", err);
        toast("Failed to load blog posts");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, []);
  
  // Initialize recentPosts to an empty array if there are no blogPosts
  const recentPosts = blogPosts.length > 0 
    ? blogPosts.slice(0, 4).map(post => ({
        id: post.id,
        title: post.title,
        date: post.date
      }))
    : [];
  
  // Filter posts if there's a filter, handle empty arrays appropriately
  const filteredPosts = filter && blogPosts.length > 0
    ? blogPosts.filter(post => post.categories.includes(filter)) 
    : blogPosts;
  
  // Find the featured post only if we have posts
  const featuredPost = filteredPosts.length > 0 
    ? filteredPosts.find(post => post.featured)
    : undefined;

  // Get regular posts (non-featured or matching filter)
  const regularPosts = filteredPosts.length > 0
    ? filteredPosts.filter(post => !post.featured || (filter && post.categories.includes(filter)))
    : [];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gray-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Insights</h1>
              <p className="text-xl text-gray-600">
                Thought leadership on business strategy, AI implementation, and digital transformation.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <p>Loading blog posts...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  {!filter && featuredPost && (
                    <div className="mb-12">
                      <BlogPostCard {...featuredPost} />
                    </div>
                  )}

                  {regularPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {regularPosts.map((post, index) => (
                        <BlogPostCard key={index} {...post} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                      <p className="text-gray-600">
                        {blogPosts.length > 0 
                          ? "No posts matching the selected category were found."
                          : "No blog posts have been published yet. Check back soon!"}
                      </p>
                      {filter && (
                        <button 
                          onClick={() => setFilter(null)} 
                          className="mt-4 text-primary font-medium hover:underline"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1">
                  <BlogSidebar 
                    categories={categories} 
                    recentPosts={recentPosts.length > 0 ? recentPosts : undefined} 
                    onCategorySelect={setFilter}
                    selectedCategory={filter}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
