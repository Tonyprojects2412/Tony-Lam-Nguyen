
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  downloadLink?: string;
  detailsLink?: string;
  type: "case-study" | "business-analysis" | "ai-project";
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  link,
  downloadLink,
  detailsLink,
  type
}: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
          {type === "case-study" ? "Case Study" : 
           type === "business-analysis" ? "Business Analysis" : "AI Project"}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {detailsLink && (
            <Link to={detailsLink}>
              <Button variant="default" size="sm">
                View Details <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          )}
          
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Visit <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
            </a>
          )}
          
          {downloadLink && (
            <a href={downloadLink} download>
              <Button variant="outline" size="sm">
                Download <Download className="ml-1 h-4 w-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
