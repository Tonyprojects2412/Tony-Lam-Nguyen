
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
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-3 mt-auto">
          {link && (
            <Button variant="outline" size="sm" asChild>
              <a href={link} target="_blank" rel="noopener noreferrer">
                View Project <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
          
          {downloadLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={downloadLink} download>
                Download <Download className="ml-1 h-3 w-3" />
              </a>
            </Button>
          )}
          
          {detailsLink && (
            <Button variant="default" size="sm" asChild>
              <Link to={detailsLink}>
                Details <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
