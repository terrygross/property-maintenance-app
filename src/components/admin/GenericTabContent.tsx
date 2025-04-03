
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FileText } from "lucide-react";

interface GenericTabContentProps {
  title: string;
  description: string;
  setActiveTab?: (tab: string) => void;
  showBackButton?: boolean;
  contentType?: "logs" | "backup" | "recycle-bin" | "default";
}

const GenericTabContent = ({ 
  title, 
  description, 
  setActiveTab, 
  showBackButton = true,
  contentType = "default"
}: GenericTabContentProps) => {
  const handleBackClick = () => {
    if (setActiveTab) {
      setActiveTab("overview");
    }
  };

  const renderContent = () => {
    switch (contentType) {
      case "logs":
        return (
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">System logs feature is coming soon.</p>
          </div>
        );
      case "backup":
      case "recycle-bin":
      case "default":
      default:
        return (
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        );
    }
  };

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

      <Card className="p-6">
        {renderContent()}
      </Card>
    </div>
  );
};

export default GenericTabContent;
