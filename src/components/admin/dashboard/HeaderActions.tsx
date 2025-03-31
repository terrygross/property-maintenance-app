
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import HighPriorityAlert from "@/components/alerts/HighPriorityAlert";

interface HeaderActionsProps {
  highPriorityJobs: any[];
  onAlertClick: () => void;
  onNewTaskClick: () => void;
}

const HeaderActions = ({ 
  highPriorityJobs, 
  onAlertClick, 
  onNewTaskClick 
}: HeaderActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      {highPriorityJobs.length > 0 && (
        <HighPriorityAlert 
          count={highPriorityJobs.length} 
          onClick={onAlertClick}
        />
      )}
      <Button 
        className="flex items-center gap-2"
        onClick={onNewTaskClick}
      >
        <PlusCircle className="h-4 w-4" />
        <span>New Task</span>
      </Button>
    </div>
  );
};

export default HeaderActions;
