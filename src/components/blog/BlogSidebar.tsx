
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogSidebarProps {
  categories: { name: string; count: number }[];
  recentPosts: { id: string; title: string; date: string }[];
}

const BlogSidebar = ({ categories, recentPosts }: BlogSidebarProps) => {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Search</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search articles..."
            className="pr-10"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={`/blog/category/${category.name.toLowerCase()}`}
                className="flex justify-between items-center text-gray-600 hover:text-primary transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-500 text-xs py-1 px-2 rounded-full">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <Link
                to={`/blog/${post.id}`}
                className="group"
              >
                <h4 className="text-gray-700 font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-gray-500 text-sm mt-1">{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
