
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const AIProjects = () => {
  const projects: ProjectCardProps[] = [
    {
      title: "Predictive Maintenance Model",
      description: "Machine learning model that predicts equipment failures, reducing downtime by 35% and maintenance costs by 25%.",
      image: "https://images.unsplash.com/photo-1581092921461-39b90b648109?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Manufacturing", "ML", "Python", "TensorFlow"],
      detailsLink: "/ai-projects/predictive-maintenance",
      link: "https://github.com",
      type: "ai-project"
    },
    {
      title: "NLP for Customer Support",
      description: "Natural language processing system that categorizes and routes customer inquiries, improving response time by 65%.",
      image: "https://images.unsplash.com/photo-1567473030492-533b30c5494c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Customer Service", "NLP", "BERT", "Python"],
      detailsLink: "/ai-projects/nlp-customer-support",
      link: "https://github.com",
      type: "ai-project"
    },
    {
      title: "Computer Vision for Quality Control",
      description: "Computer vision system for automated quality control in manufacturing, detecting defects with 97% accuracy.",
      image: "https://images.unsplash.com/photo-1563770660941-10107d1d1248?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Manufacturing", "Computer Vision", "PyTorch", "Quality Control"],
      detailsLink: "/ai-projects/computer-vision-qc",
      link: "https://github.com",
      type: "ai-project"
    },
    {
      title: "Sales Forecasting AI",
      description: "Time series forecasting model that predicts sales across multiple product categories with 94% accuracy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Retail", "Time Series", "Prophet", "Python"],
      detailsLink: "/ai-projects/sales-forecasting",
      link: "https://github.com",
      type: "ai-project"
    },
    {
      title: "Healthcare Patient Triage",
      description: "AI system that analyzes patient data to prioritize care based on urgency and risk factors.",
      image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      tags: ["Healthcare", "Classification", "Scikit-learn", "Risk Prediction"],
      detailsLink: "/ai-projects/patient-triage",
      link: "https://github.com",
      type: "ai-project"
    },
    {
      title: "Recommendation Engine",
      description: "Collaborative filtering recommendation system for e-commerce product suggestions, increasing average order value by 18%.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      tags: ["E-commerce", "Recommendation System", "Collaborative Filtering", "Python"],
      detailsLink: "/ai-projects/recommendation-engine",
      link: "https://github.com",
      type: "ai-project"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gray-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Projects</h1>
              <p className="text-xl text-gray-600">
                Explore my AI and machine learning projects across various industries, 
                showcasing practical applications of cutting-edge technologies.
              </p>
              <Button asChild variant="outline" className="mt-6">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
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
                  <li>• Scikit-learn, TensorFlow, PyTorch</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Natural Language Processing</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Text Classification</li>
                  <li>• Sentiment Analysis</li>
                  <li>• Named Entity Recognition</li>
                  <li>• BERT, GPT, Transformers</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Computer Vision</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Object Detection</li>
                  <li>• Image Classification</li>
                  <li>• Semantic Segmentation</li>
                  <li>• CNN, YOLO, OpenCV</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">AI Application Development</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Web & Mobile AI Integration</li>
                  <li>• API Development</li>
                  <li>• Model Deployment & Monitoring</li>
                  <li>• Flask, FastAPI, TensorFlow Serving</li>
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
              <Link 
                to="/contact" 
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AIProjects;
