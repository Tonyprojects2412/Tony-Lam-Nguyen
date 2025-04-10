
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";

const CaseStudies = () => {
  const caseStudies: ProjectCardProps[] = [
    {
      title: "Healthcare AI Transformation",
      description: "Strategic implementation of AI-powered patient scheduling and resource optimization systems for a major healthcare provider.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Healthcare", "AI Implementation", "Process Optimization"],
      detailsLink: "/case-studies/healthcare-ai",
      downloadLink: "#",
      type: "case-study"
    },
    {
      title: "Supply Chain Optimization",
      description: "End-to-end supply chain analysis and redesign for a global manufacturing company, reducing costs by 18% and improving fulfillment times by 23%.",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Manufacturing", "Supply Chain", "Cost Reduction"],
      detailsLink: "/case-studies/supply-chain",
      downloadLink: "#",
      type: "case-study"
    },
    {
      title: "Digital Transformation Strategy",
      description: "Developed and implemented a comprehensive digital transformation roadmap for a mid-sized financial services firm.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Financial Services", "Digital Transformation", "Strategy"],
      detailsLink: "/case-studies/digital-transformation",
      downloadLink: "#",
      type: "case-study"
    },
    {
      title: "Retail Customer Analytics",
      description: "Customer segmentation and personalization strategy leveraging ML models, increasing repeat purchases by 28%.",
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Retail", "Customer Analytics", "Personalization"],
      detailsLink: "/case-studies/retail-analytics",
      downloadLink: "#",
      type: "case-study"
    },
    {
      title: "Healthcare Cost Reduction",
      description: "Process optimization and AI implementation for administrative task automation, reducing operational costs by 22%.",
      image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      tags: ["Healthcare", "Cost Reduction", "Process Optimization"],
      detailsLink: "/case-studies/healthcare-cost",
      downloadLink: "#",
      type: "case-study"
    },
    {
      title: "E-commerce Growth Strategy",
      description: "Comprehensive growth strategy for a D2C brand, including market positioning, channel optimization and customer acquisition.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      tags: ["E-commerce", "Growth Strategy", "Marketing"],
      detailsLink: "/case-studies/ecommerce-growth",
      downloadLink: "#",
      type: "case-study"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Consulting Case Studies</h1>
              <p className="text-xl text-gray-600">
                Explore my strategic consulting work across industries, showcasing
                impactful business transformations and technology implementations.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <ProjectCard key={index} {...study} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-100 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Need Strategic Consulting?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Let's discuss how I can help your organization solve complex business challenges.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;
