
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-50 text-gray-600 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">Lam Nguyen</h3>
            <p className="mb-4 text-gray-500 max-w-md">Transforming real-world business operations into data-driven strategy through analytics, automation, and AI.


          </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/in/tony-lam-nguyen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="mailto:Tonymail2412@yahoo.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/case-studies" className="hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/business-analyst" className="hover:text-primary transition-colors">
                  Business Analysis
                </Link>
              </li>
              <li>
                <Link to="/ai-projects" className="hover:text-primary transition-colors">
                  AI Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Get In Touch
                </Link>
              </li>
              <li>
                <a href="mailto:Tonymail2412@yahoo.com" className="hover:text-primary transition-colors">Tonymail2412@yahoo.com</a>
              </li>
              <li>
                <p>Houston, TX</p>
              </li>
              <li>
                <a href="https://linkedin.com/in/tony-lam-nguyen" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  linkedin.com/in/tony-lam-nguyen
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-sm text-center text-gray-400">
          <p>© {currentYear} Lam Nguyen. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
