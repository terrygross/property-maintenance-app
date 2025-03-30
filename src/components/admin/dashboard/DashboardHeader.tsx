
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import HighPriorityAlert from "@/components/alerts/HighPriorityAlert";

interface DashboardHeaderProps {
  highPriorityJobs: any[];
  onAlertClick: () => void;
  onNewTaskClick: () => void;
}

const DashboardHeader = ({ highPriorityJobs, onAlertClick, onNewTaskClick }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your maintenance system</p>
        </div>
        {highPriorityJobs.length > 0 && (
          <HighPriorityAlert 
            count={highPriorityJobs.length} 
            onClick={onAlertClick}
          />
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          className="flex items-center gap-2"
          onClick={onNewTaskClick}
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
