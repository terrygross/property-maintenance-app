
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileX, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto w-24 h-24 bg-muted flex items-center justify-center rounded-full">
          <FileX className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold" id="notfound-title">404</h1>
        <p className="text-xl text-muted-foreground" id="notfound-description">Oops! Page not found</p>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={goBack}
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button asChild className="flex items-center gap-2" aria-label="Return to home page">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-8">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
