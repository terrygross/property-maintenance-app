
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FileText, RotateCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  const [loading, setLoading] = useState(false);
  
  const handleBackClick = () => {
    if (setActiveTab) {
      setActiveTab("overview");
    }
  };
  
  const handleRefreshLogs = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const renderContent = () => {
    switch (contentType) {
      case "logs":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">System Activity Logs</h3>
                <p className="text-muted-foreground text-sm">View recent system events and user activities</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshLogs} 
                disabled={loading}
                className="flex items-center gap-1"
              >
                <RotateCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            
            <div className="border rounded-lg">
              <div className="bg-muted p-2 px-3 text-xs font-medium flex justify-between items-center">
                <span>Timestamp</span>
                <span>Event</span>
                <span>User</span>
                <span>Details</span>
              </div>
              <div className="divide-y">
                <LogEntry 
                  timestamp="2025-04-06 16:45:12" 
                  event="Login" 
                  user="admin@example.com" 
                  details="Successful login from 192.168.1.1"
                />
                <LogEntry 
                  timestamp="2025-04-06 16:32:05" 
                  event="Job Created" 
                  user="reporter@example.com" 
                  details="High priority job reported"
                />
                <LogEntry 
                  timestamp="2025-04-06 16:15:33" 
                  event="Assignment" 
                  user="admin@example.com" 
                  details="Job #1089 assigned to John Technician"
                />
                <LogEntry 
                  timestamp="2025-04-06 15:58:21" 
                  event="Status Change" 
                  user="tech@example.com" 
                  details="Job #1088 marked as completed"
                />
                <LogEntry 
                  timestamp="2025-04-06 15:42:10" 
                  event="Compliance" 
                  user="tech@example.com" 
                  details="Completed safety checklist for Property #45"
                />
                <LogEntry 
                  timestamp="2025-04-06 15:25:00" 
                  event="System" 
                  user="system" 
                  details="Daily backup completed successfully"
                />
                <LogEntry 
                  timestamp="2025-04-06 14:18:45" 
                  event="Property Added" 
                  user="admin@example.com" 
                  details="Added new property: 123 Main Street"
                />
                <LogEntry 
                  timestamp="2025-04-06 14:05:32" 
                  event="User Created" 
                  user="admin@example.com" 
                  details="Created new technician account for Sarah Jones"
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button variant="outline" size="sm">Load More</Button>
            </div>
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

const LogEntry = ({ timestamp, event, user, details }) => {
  return (
    <div className="px-3 py-2 text-sm flex justify-between items-center hover:bg-slate-50">
      <span className="text-muted-foreground w-1/4">{timestamp}</span>
      <span className="w-1/6 font-medium">{event}</span>
      <span className="w-1/4">{user}</span>
      <span className="w-1/3 text-muted-foreground truncate">{details}</span>
    </div>
  );
};

export default GenericTabContent;
