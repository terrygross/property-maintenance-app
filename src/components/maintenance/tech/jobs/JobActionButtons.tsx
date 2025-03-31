
import React from "react";
import { Button } from "@/components/ui/button";
import { Job } from "./JobCardTypes";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="flex flex-col gap-2">
      {isHighPriority && !isAccepted && onAcceptJob && (
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => onAcceptJob(job.id)}
          className="mb-1"
        >
          Accept Job
        </Button>
      )}
      
      {(onUpdateStatus || isAdmin) && status !== "completed" && (
        <Button 
          size="sm" 
          variant={status === "in_progress" ? "outline" : "secondary"} 
          onClick={handleStatusUpdate}
          className="mb-1"
        >
          {status === "in_progress" ? "Mark Complete" : "Start Job"}
        </Button>
      )}
      
      <Button 
        size="sm" 
        variant={isHighPriority && !isAccepted ? "destructive" : "outline"} 
        onClick={() => onViewDetails(job)}
      >
        {isHighPriority && !isAccepted ? "Urgent" : "View Details"}
      </Button>
    </div>
  );
};

export default JobActionButtons;
