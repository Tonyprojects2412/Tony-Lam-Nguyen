
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl">Portfolio</Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/case-studies" className="text-gray-700 hover:text-primary transition">Case Studies</Link>
            <Link to="/business-analyst" className="text-gray-700 hover:text-primary transition">Business Analyst</Link>
            <Link to="/ai-projects" className="text-gray-700 hover:text-primary transition">AI Projects</Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary transition">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition">Contact</Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">CMS Login</Link>
            </Button>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/case-studies" className="block text-gray-700 hover:text-primary transition" onClick={toggleMenu}>Case Studies</Link>
              </li>
              <li>
                <Link to="/business-analyst" className="block text-gray-700 hover:text-primary transition" onClick={toggleMenu}>Business Analyst</Link>
              </li>
              <li>
                <Link to="/ai-projects" className="block text-gray-700 hover:text-primary transition" onClick={toggleMenu}>AI Projects</Link>
              </li>
              <li>
                <Link to="/blog" className="block text-gray-700 hover:text-primary transition" onClick={toggleMenu}>Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="block text-gray-700 hover:text-primary transition" onClick={toggleMenu}>Contact</Link>
              </li>
              <li>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/admin">CMS Login</Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
