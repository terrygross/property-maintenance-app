
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SystemSettings from "@/components/settings/SystemSettings";
import SystemLogs from "@/components/admin/logs/SystemLogs";
import RecycleBin from "@/components/admin/recycle-bin/RecycleBin";

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

  // Check which tab this is
  const isSettingsTab = title === "System Settings";
  const isLogsTab = title === "System Logs";
  const isRecycleBinTab = title === "Recycle Bin";

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
        {!isSettingsTab && !isLogsTab && !isRecycleBinTab && (
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        )}
      </div>

      {isSettingsTab ? (
        <SystemSettings />
      ) : isLogsTab ? (
        <SystemLogs />
      ) : isRecycleBinTab ? (
        <RecycleBin />
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
