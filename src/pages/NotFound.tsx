
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container max-w-md px-4 py-8 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
        <p className="mt-4">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
