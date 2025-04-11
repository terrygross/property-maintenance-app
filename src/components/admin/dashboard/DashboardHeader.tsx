
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import HighPriorityAlert from "@/components/alerts/HighPriorityAlert";

interface DashboardHeaderProps {
  highPriorityJobs: any[];
  unassignedJobs?: any[]; 
  onAlertClick: () => void;
  onNewTaskClick: () => void;
}

const DashboardHeader = ({ 
  highPriorityJobs, 
  unassignedJobs = [], 
  onAlertClick, 
  onNewTaskClick 
}: DashboardHeaderProps) => {
  // Calculate total alerts (high priority jobs + unassigned jobs with high priority)
  const highPriorityUnassigned = unassignedJobs.filter(job => 
    job.priority === "high" || job.highPriority === true
  );
  
  const totalAlertCount = highPriorityJobs.length + highPriorityUnassigned.length;
  
  // Log alert count for debugging
  useEffect(() => {
    console.log("DashboardHeader - High priority jobs count:", highPriorityJobs.length);
    console.log("DashboardHeader - High priority unassigned jobs count:", highPriorityUnassigned.length);
    console.log("DashboardHeader - Total alert count:", totalAlertCount);
    
    if (highPriorityUnassigned.length > 0) {
      console.log("DashboardHeader - First high priority unassigned job:", highPriorityUnassigned[0]);
    }
  }, [highPriorityJobs.length, highPriorityUnassigned.length, totalAlertCount]);
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your maintenance system</p>
        </div>
        {totalAlertCount > 0 && (
          <HighPriorityAlert 
            count={totalAlertCount} 
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
