
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CareCrew</h3>
            <p className="text-gray-600">Comprehensive maintenance management system for property managers.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Support</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2023 CareCrew. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/" className="text-gray-600 hover:text-primary" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link to="/" className="text-gray-600 hover:text-primary" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link to="/" className="text-gray-600 hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
