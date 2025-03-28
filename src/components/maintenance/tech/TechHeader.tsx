
import React from "react";
import { Button } from "@/components/ui/button";

const TechHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Maintenance Dashboard</h1>
            <p className="text-muted-foreground">Welcome, John Doe</p>
          </div>
          <Button variant="outline" onClick={() => console.log("logout")}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TechHeader;
