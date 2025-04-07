
import React from "react";
import { Button } from "@/components/ui/button";
import { Job } from "./JobCardTypes";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Pause, Play } from "lucide-react";

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

  const handlePauseJob = () => {
    if (onUpdateStatus) {
      onUpdateStatus(job.id, "paused");
      toast({
        title: "Job Paused",
        description: "This job is now paused while waiting for materials. You'll receive daily reminders until it's completed.",
      });
    }
  };

  const handleUnpauseJob = () => {
    if (onUpdateStatus) {
      onUpdateStatus(job.id, "in_progress");
      toast({
        title: "Job Resumed",
        description: "This job is now back in progress.",
      });
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
      
      {status === "paused" && onUpdateStatus && (
        <Button
          size={buttonSize}
          variant="secondary"
          onClick={handleUnpauseJob}
          className="mb-1 w-full md:w-auto"
        >
          <Play className="h-4 w-4 mr-1" /> Resume Job
        </Button>
      )}
      
      {status === "in_progress" && onUpdateStatus && (
        <Button
          size={buttonSize}
          variant="outline"
          onClick={handlePauseJob}
          className="mb-1 w-full md:w-auto"
        >
          <Pause className="h-4 w-4 mr-1" /> Pause Job
        </Button>
      )}
      
      {(onUpdateStatus || isAdmin) && status !== "completed" && status !== "paused" && (
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
