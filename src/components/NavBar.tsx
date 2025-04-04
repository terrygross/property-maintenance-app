
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-primary">
              CareCrew
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary">
                Home
              </Link>
              <Link to="/features" className="text-gray-700 hover:text-primary">
                Features
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-primary">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary">
                Contact
              </Link>
              <Button variant="secondary" size="sm" asChild>
                <Link to="/reporter" className="font-medium">
                  Reporter Station
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/maintenance">Maintenance Staff</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
