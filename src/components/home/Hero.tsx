import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Hero = () => {
  return <section className="bg-gradient-to-b from-gray-50 to-white pt-20 pb-32">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Business Strategy & 
              <span className="text-primary"> AI Consulting</span>
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed text-base">
              Transforming real-world business operations into data-driven strategy through analytics, automation, and AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/case-studies">
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img src="/lovable-uploads/2afced3f-41f9-4ac1-9c37-8487330672e3.png" alt="Lam Nguyen - Business Strategy & AI Consultant" className="w-72 h-72 md:w-96 md:h-96 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;