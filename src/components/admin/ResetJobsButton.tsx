
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { resetJobsWithMockData } from "@/utils/mockJobGenerator";

interface ResetJobsButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

const ResetJobsButton = ({ variant = "outline", className = "" }: ResetJobsButtonProps) => {
  const { toast } = useToast();

  const handleResetJobs = () => {
    if (window.confirm("Are you sure you want to reset all jobs? This will delete existing jobs and create new unassigned jobs.")) {
      resetJobsWithMockData();
      
      toast({
        title: "Jobs Reset Successfully",
        description: "All jobs have been reset with new mock data. View them in the 'Reported Jobs' tab.",
        duration: 5000, // Show for longer
      });
      
      // Trigger a custom event to notify components to refresh
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleResetJobs}
      className={`flex items-center gap-2 ${className}`}
      size="sm"
    >
      <RefreshCw className="h-4 w-4" />
      Reset Jobs (Creates Unassigned Jobs)
    </Button>
  );
};

export default ResetJobsButton;
