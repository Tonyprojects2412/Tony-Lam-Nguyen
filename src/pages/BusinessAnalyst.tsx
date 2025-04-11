
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";

const BusinessAnalyst = () => {
  // Empty array for projects
  const projects: ProjectCardProps[] = [];

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
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  New business analysis projects coming soon!
                </p>
              </div>
            )}
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
