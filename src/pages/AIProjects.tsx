
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const AIProjects = () => {
  // Empty array for AI projects
  const projects: ProjectCardProps[] = [];
  
  return <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gray-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Projects</h1>
              <p className="text-xl text-gray-600">Explore my AI App and Machine Learning projects across various industries, showcasing practical applications of cutting-edge technologies.</p>
              <Button asChild variant="outline" className="mt-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container-custom">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => <ProjectCard key={index} {...project} />)}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  New AI projects coming soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Technologies Section */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">AI & ML Technologies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Machine Learning</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Supervised Learning</li>
                  <li>• Unsupervised Learning</li>
                  <li>• Reinforcement Learning</li>
                  <li>• Deep Learning</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">AI Frameworks</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• TensorFlow</li>
                  <li>• PyTorch</li>
                  <li>• Scikit-learn</li>
                  <li>• Keras</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">AI Applications</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Computer Vision</li>
                  <li>• Natural Language Processing</li>
                  <li>• Time Series Forecasting</li>
                  <li>• Recommendation Systems</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Data Engineering</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• ETL Pipelines</li>
                  <li>• Data Warehousing</li>
                  <li>• Big Data Processing</li>
                  <li>• Feature Engineering</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-100 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Looking to Implement AI in Your Business?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Let's discuss how custom AI solutions can drive efficiency, growth, and innovation for your organization.
              </p>
              <Link to="/contact" className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};
export default AIProjects;
