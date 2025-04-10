
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Featured case studies
  const featuredProjects: ProjectCardProps[] = [
    {
      title: "Healthcare AI Transformation",
      description: "Strategic implementation of AI-powered patient scheduling and resource optimization systems for a major healthcare provider.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Healthcare", "AI Implementation", "Process Optimization"],
      detailsLink: "/case-studies/healthcare-ai",
      type: "case-study"
    },
    {
      title: "Retail Analytics Dashboard",
      description: "Developed comprehensive sales analytics dashboard using SQL and Power BI, resulting in 15% increase in inventory turnover.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Retail", "Data Analytics", "Business Intelligence"],
      detailsLink: "/business-analyst/retail-dashboard",
      type: "business-analysis"
    },
    {
      title: "Predictive Maintenance Model",
      description: "Machine learning model that predicts equipment failures, reducing downtime by 35% and maintenance costs by 25%.",
      image: "https://images.unsplash.com/photo-1581092921461-39b90b648109?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Manufacturing", "ML Model", "Cost Reduction"],
      detailsLink: "/ai-projects/predictive-maintenance",
      type: "ai-project"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        
        {/* Featured Projects Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-gray-600 max-w-2xl">
                  Explore some of my recent work across business strategy, data analytics, and AI implementation.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/case-studies">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business with AI?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Let's discuss how I can help your organization leverage data and AI 
                to drive growth and competitive advantage.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
