
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SystemSettings from "@/components/settings/SystemSettings";

interface GenericTabContentProps {
  title: string;
  description: string;
  setActiveTab?: (tab: string) => void;
}

const GenericTabContent = ({ title, description, setActiveTab }: GenericTabContentProps) => {
  const handleBackClick = () => {
    if (setActiveTab) {
      setActiveTab("overview");
    }
  };

  // Check if this is the settings tab
  const isSettingsTab = title === "System Settings";

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        {setActiveTab && (
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
        {!isSettingsTab && (
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        )}
      </div>

      {isSettingsTab ? (
        <SystemSettings />
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
