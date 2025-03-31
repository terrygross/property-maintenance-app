
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Job } from "@/components/jobs/jobsListUtils";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";

/**
 * Hook for handling job status updates
 */
export const useJobStatusUpdates = (initialJobs: Job[]) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const { toast } = useToast();
  
  // Function to handle updating job status
  const handleUpdateJobStatus = (jobId: string, status: string) => {
    // If trying to mark as complete, verify after photo exists
    if (status === "completed") {
      const job = jobs.find(j => j.id === jobId);
      if (!job?.photos?.after) {
        toast({
          title: "After photo required",
          description: "You must add an 'after' photo before marking this job as complete.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Update the UI
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: status
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = updateJobStatus(jobId, status);
    
    if (success) {
      toast({
        title: status === "in_progress" ? "Job Started" : "Job Completed",
        description: status === "in_progress" 
          ? "You have marked this job as in progress." 
          : "You have marked this job as complete.",
        variant: "default",
      });
      
      // Dispatch a custom event to notify other components about job updates
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
    } else if (status === "completed") {
      toast({
        title: "After photo required",
        description: "You must add an 'after' photo before marking this job as complete.",
        variant: "destructive",
      });
    }
  };
  
  return {
    jobs,
    setJobs,
    handleUpdateJobStatus
  };
};
