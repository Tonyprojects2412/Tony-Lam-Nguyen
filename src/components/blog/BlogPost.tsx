import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
  categories: string[];
}
const BlogPostCard = ({
  id,
  title,
  excerpt,
  date,
  readTime,
  author,
  image,
  featured = false,
  categories
}: BlogPostProps) => {
  if (featured) {
    return <div className="relative rounded-xl overflow-hidden shadow-md">
        <div className="relative h-80 w-full">
          
          
          
          
        </div>
      </div>;
  }
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {categories.slice(0, 2).map((category, idx) => <span key={idx} className="bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded">
              {category}
            </span>)}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
        
        <div className="flex items-center text-gray-500 text-sm gap-4 mb-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {readTime}
          </div>
        </div>
        
        <Link to={`/blog/${id}`} className="text-primary font-medium hover:underline">
          Read More
        </Link>
      </div>
    </div>;
};
export default BlogPostCard;