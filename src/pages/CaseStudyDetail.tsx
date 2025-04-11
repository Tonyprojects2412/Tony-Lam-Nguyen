
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaseStudyVietnam = () => {
  const caseStudyData = {
    title: "Market Entry Strategy for a Technology-Driven Medical Laboratory in Ho Chi Minh City, Vietnam",
    image: "/lovable-uploads/ca06ff47-2df4-43a4-8a4d-5e6ebd027089.png",
    publishDate: "April 2025",
    readTime: "5 min read",
    author: "Consulting Team",
    content: [
      {
        type: "question",
        text: "How can a new, technology-driven medical laboratory successfully enter and differentiate itself in the competitive Ho Chi Minh City healthcare market?"
      },
      {
        type: "section",
        title: "Context",
        content: "Ho Chi Minh City (HCMC) is experiencing significant growth in healthcare demand, especially in outpatient and diagnostic testing since the COVID-19 era. While major players like Medlatec and CityLab dominate general diagnostics, underserved opportunities exist in:\n\n• Digital integration (e.g., API connection with health platforms)\n• At-home sample collection\n• AI-assisted pre-diagnosis screening\n\nThe client seeks to build a lean, niche diagnostic lab with high-tech integration and strong B2B orientation. However, entry barriers such as licensing from the Ministry of Health, biohazard waste compliance, and location constraints add complexity."
      },
      {
        type: "section",
        title: "Strategic Framework: ECME",
        content: ""
      },
      {
        type: "subsection",
        title: "Environment",
        content: "• Post-COVID: spike in preventive health checks\n• Regulatory: MOH licensing, biohazard control, facility zoning\n• Trend: push for digital transformation in healthcare"
      },
      {
        type: "subsection",
        title: "Customer",
        content: "• Urban professionals (30–55)\n• Clinics & private hospitals\n• Corporate wellness programs\n• Healthtech platforms needing API-enabled results"
      },
      {
        type: "subsection",
        title: "Market & Competitors",
        content: "• Medlatec: Strong brand, wide coverage, but low on API innovation\n• CityLab: Fast and affordable, but offline focused\n• VILACO: High-end diagnostics, not suitable for general market\n\nStrategic gap: No player offers a digital-first lab with API, AI, and at-home collection – a white space to capture."
      },
      {
        type: "section",
        title: "Entry Strategy",
        content: "• Lean setup with pre-zoned facility\n• API integration with health platforms\n• AI for pre-diagnostic screening"
      },
      {
        type: "section",
        title: "Hypotheses & Data",
        content: "• Patients pay premium for convenience\n• Clinics prefer to outsource diagnostics\n• API + AI = Differentiator\n• Location, permits, and waste handling = Critical to viability"
      },
      {
        type: "section",
        title: "Alternatives & Recommendation",
        content: "• Option A: Compete in general diagnostics → Low ROI\n• Option B: Digital-first + at-home → ✅ Chosen Strategy\n• Option C: B2B backend provider → Branding challenge"
      },
      {
        type: "section",
        title: "Conclusion",
        content: "This case demonstrates that in healthcare, precision beats scale. To win in a crowded market, find the underserved niche – and use technology, speed, and smart compliance to dominate it.\n\nLet's connect if you're exploring market entry in emerging healthcare markets."
      }
    ]
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Image */}
        <div className="relative w-full h-[400px] bg-gray-100">
          <img 
            src={caseStudyData.image} 
            alt={caseStudyData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container-custom absolute inset-0 flex flex-col justify-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {caseStudyData.title}
              </h1>
              <div className="flex items-center text-white/80 text-sm gap-4">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {caseStudyData.publishDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {caseStudyData.readTime}
                </div>
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {caseStudyData.author}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-12">
          <Link to="/case-studies" className="inline-flex items-center text-primary hover:underline mb-8">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Case Studies
          </Link>

          <div className="max-w-3xl mx-auto">
            {caseStudyData.content.map((section, index) => {
              if (section.type === "question") {
                return (
                  <div key={index} className="mb-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h2 className="text-xl font-medium text-primary mb-0">{section.text}</h2>
                  </div>
                );
              } else if (section.type === "section") {
                return (
                  <div key={index} className="mb-8">
                    {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}
                    {section.content && (
                      <div className="prose max-w-none">
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 whitespace-pre-line">{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else if (section.type === "subsection") {
                return (
                  <div key={index} className="mb-6 ml-4">
                    {section.title && <h3 className="text-xl font-bold mb-3">{section.title}</h3>}
                    {section.content && (
                      <div className="prose max-w-none ml-4">
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 whitespace-pre-line">{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}

            <div className="mt-12 flex justify-center">
              <Link to="/contact">
                <Button size="lg">
                  Discuss Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // For now, we only have the Vietnam case study implemented
  if (id === "healthcare-ai") {
    return <CaseStudyVietnam />;
  }
  
  // Redirect to the case studies page if the case study doesn't exist
  return <Navigate to="/case-studies" replace />;
};

export default CaseStudyDetail;
