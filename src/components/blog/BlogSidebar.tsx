
import { Link } from "react-router-dom";

export interface BlogSidebarProps {
  categories: { name: string; count: number }[];
  recentPosts: { id: string; title: string; date: string }[];
  selectedCategory?: string;
  onCategorySelect?: React.Dispatch<React.SetStateAction<string>>;
}

const BlogSidebar = ({ 
  categories, 
  recentPosts,
  selectedCategory,
  onCategorySelect
}: BlogSidebarProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                className={`text-left w-full hover:text-primary ${selectedCategory === category.name ? 'text-primary font-medium' : ''}`}
                onClick={() => onCategorySelect && onCategorySelect(category.name === selectedCategory ? '' : category.name)}
              >
                {category.name} ({category.count})
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
        <ul className="space-y-3">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <Link to={`/blog/${post.id}`} className="block hover:text-primary">
                <h4 className="font-medium">{post.title}</h4>
                <span className="text-sm text-gray-500">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
