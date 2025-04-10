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
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      
      
      
    </div>;
};
export default ProjectCard;