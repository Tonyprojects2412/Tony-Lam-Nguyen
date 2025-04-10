
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
const Contact = () => {
  return <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-gray-50 py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
              <p className="text-xl text-gray-600">
                I'm always interested in discussing new projects, opportunities, and partnerships.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <a href="mailto:Tonymail2412@yahoo.com" className="text-gray-600 hover:text-primary">
                          Tonymail2412@yahoo.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-gray-600">Houston, Texas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Linkedin className="h-5 w-5 text-primary mt-1 mr-4" />
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <a href="https://linkedin.com/in/tony-lam-nguyen" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          linkedin.com/in/tony-lam-nguyen
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="font-medium mb-4">Connect With Me</h3>
                    <div className="flex space-x-4">
                      <a href="https://linkedin.com/in/tony-lam-nguyen" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
                        <Linkedin className="h-5 w-5 text-gray-700" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
                        <Github className="h-5 w-5 text-gray-700" />
                        <span className="sr-only">GitHub</span>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors">
                        <Twitter className="h-5 w-5 text-gray-700" />
                        <span className="sr-only">Twitter</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="bg-primary text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Available for Select Projects</h2>
              <p className="text-lg opacity-90 mb-6">I'm currently available for Business Analyst and Strategy Consulting role. Let's discuss how I can help your organization.</p>
              <a href="mailto:Tonymail2412@yahoo.com" className="inline-block bg-white text-primary font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
                Email Me Directly
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>;
};
export default Contact;
