
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary">
              CareCrew
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className={`${isActive("/") ? "text-primary font-medium" : "text-gray-700"} hover:text-primary`}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className={`${isActive("/features") ? "text-primary font-medium" : "text-gray-700"} hover:text-primary`}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className={`${isActive("/pricing") ? "text-primary font-medium" : "text-gray-700"} hover:text-primary`}
              >
                Pricing
              </Link>
              <Link 
                to="/contact" 
                className={`${isActive("/contact") ? "text-primary font-medium" : "text-gray-700"} hover:text-primary`}
              >
                Contact
              </Link>
              <Button variant="secondary" size="sm" asChild>
                <Link to="/reporter" className="font-medium">
                  Reporter Station
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/maintenance">Maintenance Staff</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-3 space-y-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md ${isActive("/") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`block px-3 py-2 rounded-md ${isActive("/features") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className={`block px-3 py-2 rounded-md ${isActive("/pricing") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md ${isActive("/contact") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/reporter" 
              className={`block px-3 py-2 rounded-md ${isActive("/reporter") ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Reporter Station
            </Link>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button variant="outline" size="sm" asChild className="w-full justify-center">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
              </Button>
              <Button size="sm" asChild className="w-full justify-center">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild className="w-full justify-center">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-center">
                <Link to="/maintenance" onClick={() => setMobileMenuOpen(false)}>Maintenance</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
