
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";

const BusinessAnalyst = () => {
  const projects: ProjectCardProps[] = [
    {
      title: "Retail Analytics Dashboard",
      description: "Developed comprehensive sales analytics dashboard using SQL and Power BI, resulting in 15% increase in inventory turnover.",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Retail", "Data Analytics", "Power BI"],
      detailsLink: "/business-analyst/retail-dashboard",
      downloadLink: "#",
      type: "business-analysis"
    },
    {
      title: "Financial Performance Analysis",
      description: "Created dynamic Excel models to analyze financial performance across business units, identifying $1.2M in cost-saving opportunities.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Finance", "Excel", "Cost Analysis"],
      detailsLink: "/business-analyst/financial-analysis",
      downloadLink: "#",
      type: "business-analysis"
    },
    {
      title: "Customer Journey Mapping",
      description: "Analyzed customer touchpoints and developed journey maps to identify friction points and improvement opportunities.",
      image: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Customer Experience", "Journey Mapping", "UX"],
      detailsLink: "/business-analyst/customer-journey",
      downloadLink: "#",
      type: "business-analysis"
    },
    {
      title: "Sales Forecasting Model",
      description: "Developed statistical models to predict quarterly sales by product category with 92% accuracy.",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Sales", "Forecasting", "Statistical Modeling"],
      detailsLink: "/business-analyst/sales-forecasting",
      downloadLink: "#",
      type: "business-analysis"
    },
    {
      title: "Process Improvement Initiative",
      description: "Documented and redesigned order fulfillment processes, reducing processing time by 35% and error rates by 42%.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tags: ["Process Improvement", "Workflow Optimization", "Efficiency"],
      detailsLink: "/business-analyst/process-improvement",
      downloadLink: "#",
      type: "business-analysis"
    },
    {
      title: "Market Entry Analysis",
      description: "Conducted comprehensive market research and competitive analysis for new product launch in emerging markets.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
      tags: ["Market Research", "Competitive Analysis", "Strategy"],
      detailsLink: "/business-analyst/market-entry",
      downloadLink: "#",
      type: "business-analysis"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Analysis Projects</h1>
              <p className="text-xl text-gray-600">
                Explore my business analysis work including dashboards, Excel models, 
                process improvement initiatives, and data-driven business insights.
              </p>
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

        {/* Skills Section */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Business Analysis Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Data Analysis</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• SQL & Database Analysis</li>
                  <li>• Advanced Excel Modeling</li>
                  <li>• Statistical Analysis</li>
                  <li>• Data Cleaning & Preparation</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Visualization</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Power BI</li>
                  <li>• Tableau</li>
                  <li>• Data Storytelling</li>
                  <li>• Executive Reporting</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Business Processes</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Process Mapping</li>
                  <li>• Requirements Gathering</li>
                  <li>• Process Optimization</li>
                  <li>• Change Management</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Strategic Analysis</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Market Research</li>
                  <li>• Competitive Analysis</li>
                  <li>• Financial Modeling</li>
                  <li>• ROI & Business Case Development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BusinessAnalyst;
