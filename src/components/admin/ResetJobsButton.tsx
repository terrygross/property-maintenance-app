
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { RefreshCcw } from "lucide-react";

interface ResetJobsButtonProps {
  onReset?: () => void;
}

const ResetJobsButton = ({ onReset }: ResetJobsButtonProps) => {
  const handleReset = () => {
    // Clear localStorage job data
    localStorage.removeItem('jobs');
    localStorage.removeItem('highPriorityJobs');
    
    // Execute any additional reset logic from parent component
    if (onReset) {
      onReset();
    }
    
    toast({
      title: "Jobs Reset",
      description: "All job data has been reset successfully.",
    });
    
    // Refresh the page to reflect changes
    window.location.reload();
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleReset}
      className="flex items-center gap-1"
    >
      <RefreshCcw className="h-4 w-4" />
      Reset Jobs
    </Button>
  );
};

export default ResetJobsButton;
