
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/projects/ProjectCard";

const CaseStudies = () => {
  const caseStudies: ProjectCardProps[] = [{
    title: "Market Entry Strategy for a Technology-Driven Medical Laboratory in Vietnam",
    description: "How a new, technology-driven medical laboratory successfully entered the competitive Ho Chi Minh City healthcare market through digital integration, at-home collection, and AI-assisted pre-diagnosis screening.",
    image: "/lovable-uploads/ca06ff47-2df4-43a4-8a4d-5e6ebd027089.png",
    tags: ["Healthcare", "Market Entry", "Digital Transformation"],
    detailsLink: "/case-studies/healthcare-ai",
    downloadLink: "#",
    type: "case-study"
  }];
  
  return <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gray-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Consulting Case Studies</h1>
              <p className="text-xl text-gray-600">Dive into my consulting case studies, where I blend analytics, process improvement, and strategy to help organizations solve complex problems and achieve meaningful impact.</p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => <ProjectCard key={index} {...study} />)}
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
              <a href="/contact" className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};

export default CaseStudies;
