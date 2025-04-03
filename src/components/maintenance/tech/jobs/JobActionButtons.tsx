
import React from "react";
import { Button } from "@/components/ui/button";
import { Job } from "./JobCardTypes";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobActionButtonsProps {
  job: Job;
  isHighPriority: boolean;
  isAccepted: boolean;
  status: string;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  onViewDetails: (job: Job) => void;
  isAdmin?: boolean;
}

const JobActionButtons = ({ 
  job, 
  isHighPriority, 
  isAccepted, 
  status,
  onAcceptJob,
  onUpdateStatus,
  onViewDetails,
  isAdmin = false
}: JobActionButtonsProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleStatusUpdate = () => {
    if (status === "in_progress" && !job.photos?.after && onUpdateStatus) {
      toast({
        variant: "destructive",
        title: "After photo required",
        description: "You must add an 'after' photo before marking this job as complete.",
      });
      
      onViewDetails(job);
      return;
    }
    
    if (onUpdateStatus) {
      onUpdateStatus(job.id, status === "in_progress" ? "completed" : "in_progress");
    }
  };

  // Determine button size based on screen size
  const buttonSize = isMobile ? "xs" : "sm";

  return (
    <div className="flex flex-col gap-2">
      {isHighPriority && !isAccepted && onAcceptJob && (
        <Button 
          size={buttonSize} 
          variant="destructive"
          onClick={() => onAcceptJob(job.id)}
          className="mb-1 w-full md:w-auto"
        >
          Accept Job
        </Button>
      )}
      
      {(onUpdateStatus || isAdmin) && status !== "completed" && (
        <Button 
          size={buttonSize} 
          variant={status === "in_progress" ? "outline" : "secondary"} 
          onClick={handleStatusUpdate}
          className="mb-1 w-full md:w-auto"
        >
          {status === "in_progress" ? "Mark Complete" : "Start Job"}
        </Button>
      )}
      
      <Button 
        size={buttonSize} 
        variant={isHighPriority && !isAccepted ? "destructive" : "outline"} 
        onClick={() => onViewDetails(job)}
        className="w-full md:w-auto"
      >
        {isHighPriority && !isAccepted ? "Urgent" : "View Details"}
      </Button>
    </div>
  );
};

export default JobActionButtons;
