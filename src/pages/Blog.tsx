import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogPostCard, { BlogPostProps } from "@/components/blog/BlogPost";
import BlogSidebar from "@/components/blog/BlogSidebar";
const Blog = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const posts: BlogPostProps[] = [{
    id: "ai-business-strategy",
    title: "AI-Driven Business Strategy: Beyond the Hype",
    excerpt: "How organizations can move past AI hype to implement practical, value-driven AI strategies that enhance competitive advantage.",
    date: "April 2, 2025",
    readTime: "8 min read",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    categories: ["AI Strategy", "Business"]
  }, {
    id: "healthcare-ai-applications",
    title: "Transforming Healthcare with AI: Real-World Applications",
    excerpt: "Examining practical applications of AI in healthcare settings that are improving patient outcomes and operational efficiency.",
    date: "March 15, 2025",
    readTime: "6 min read",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    categories: ["Healthcare", "AI Implementation"]
  }, {
    id: "data-driven-decision-making",
    title: "The Art of Data-Driven Decision Making",
    excerpt: "How business leaders can leverage data analytics to make more informed strategic decisions while avoiding common pitfalls.",
    date: "March 8, 2025",
    readTime: "5 min read",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    categories: ["Data Analytics", "Leadership"]
  }, {
    id: "ethical-ai-development",
    title: "Ethical Considerations in AI Development",
    excerpt: "Exploring the ethical challenges in AI implementation and frameworks for responsible AI development.",
    date: "February 20, 2025",
    readTime: "7 min read",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    categories: ["AI Ethics", "Implementation"]
  }, {
    id: "supply-chain-optimization",
    title: "AI-Powered Supply Chain Optimization",
    excerpt: "How machine learning and predictive analytics are revolutionizing supply chain management and logistics.",
    date: "February 5, 2025",
    readTime: "6 min read",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    categories: ["Supply Chain", "AI Implementation"]
  }, {
    id: "digital-transformation-strategy",
    title: "Building a Successful Digital Transformation Strategy",
    excerpt: "Key elements of effective digital transformation and how to avoid the common reasons these initiatives fail.",
    date: "January 18, 2025",
    readTime: "9 min read",
    author: "John Doe",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    categories: ["Digital Transformation", "Strategy"]
  }];
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
  const recentPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4).map(post => ({
    id: post.id,
    title: post.title,
    date: post.date
  }));
  const filteredPosts = filter ? posts.filter(post => post.categories.includes(filter)) : posts;
  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || filter && post.categories.includes(filter));
  return <>
      <Navbar />
      <main>
        {/* Header */}
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

        {/* Blog Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Featured Post */}
                {!filter && featuredPost && <div className="mb-12">
                    <BlogPostCard {...featuredPost} />
                  </div>}

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {regularPosts.map((post, index) => <BlogPostCard key={index} {...post} />)}
                </div>

                {/* No Results */}
                {regularPosts.length === 0 && <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                    <p className="text-gray-600">
                      No posts matching the selected category were found.
                    </p>
                    <button onClick={() => setFilter(null)} className="mt-4 text-primary font-medium hover:underline">
                      Clear filter
                    </button>
                  </div>}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar categories={categories} recentPosts={recentPosts} />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        
      </main>
      <Footer />
    </>;
};
export default Blog;