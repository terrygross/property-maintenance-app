
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Job } from "@/components/jobs/jobsListUtils";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";
import { hasAdminAccess } from "@/types/user";

/**
 * Hook for handling job status updates
 */
export const useJobStatusUpdates = (initialJobs: Job[], userRole?: string) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const { toast } = useToast();
  const isAdmin = userRole ? hasAdminAccess(userRole as any) : false;
  
  // Function to handle updating job status
  const handleUpdateJobStatus = (jobId: string, status: string) => {
    // If trying to mark as complete and user is not admin, verify after photo exists
    if (status === "completed" && !isAdmin) {
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
          : isAdmin && !jobs.find(j => j.id === jobId)?.photos?.after
            ? "You have marked this job as complete (admin override)."
            : "You have marked this job as complete.",
        variant: "default",
      });
      
      // Dispatch a custom event to notify other components about job updates
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
      
      // Force a refresh of localStorage to ensure all components get updated
      window.dispatchEvent(new Event('storage'));
    } else if (status === "completed" && !isAdmin) {
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
