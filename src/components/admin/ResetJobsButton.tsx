
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { resetJobsWithMockData } from "@/utils/mockJobGenerator";

interface ResetJobsButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ResetJobsButton = ({ variant = "outline" }: ResetJobsButtonProps) => {
  const { toast } = useToast();

  const handleResetJobs = () => {
    if (window.confirm("Are you sure you want to reset all jobs? This will delete existing jobs and create new mock data.")) {
      resetJobsWithMockData();
      
      toast({
        title: "Jobs Reset Successfully",
        description: "All jobs have been reset with new mock data.",
      });
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleResetJobs}
      className="flex items-center gap-2"
    >
      <RefreshCw className="h-4 w-4" />
      Reset Jobs
    </Button>
  );
};

export default ResetJobsButton;
