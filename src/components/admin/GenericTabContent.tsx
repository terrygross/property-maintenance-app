
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SystemLogs from "./logs/SystemLogs";

interface GenericTabContentProps {
  title: string;
  description: string;
  setActiveTab?: (tab: string) => void;
  showBackButton?: boolean;
}

const GenericTabContent = ({ 
  title, 
  description, 
  setActiveTab, 
  showBackButton = true 
}: GenericTabContentProps) => {
  const handleBackClick = () => {
    if (setActiveTab) {
      setActiveTab("overview");
    }
  };

  // Determine if we should render system logs based on the title
  const isSystemLogs = title === "System Logs";

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        {setActiveTab && showBackButton && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackClick}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Overview
          </Button>
        )}
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      {isSystemLogs ? (
        <Card className="p-6">
          <SystemLogs />
        </Card>
      ) : (
        <Card className="p-6">
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GenericTabContent;
