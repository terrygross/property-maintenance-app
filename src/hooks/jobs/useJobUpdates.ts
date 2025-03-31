
/**
 * Hook for handling job update operations
 */
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Job } from "./types";
import { 
  updateJobAcceptance, 
  updateJobStatus, 
  updateJobPriority 
} from "@/components/maintenance/tech/jobs/JobUtils";
import { updateLocalStorageJobs } from "@/components/maintenance/tech/jobs/utils/photoUtils";

export const useJobUpdates = (initialJobs: Job[]) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const { toast } = useToast();
  
  // Function to handle photo updates for jobs
  const handleJobPhotoUpdate = (jobId: string, type: "before" | "after", imageUrl: string) => {
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            photos: {
              ...(job.photos || {}),
              [type]: imageUrl
            }
          };
        }
        return job;
      })
    );
    
    toast({
      title: "Photo updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} photo has been saved.`,
    });
    
    // In a real application, this would sync with the backend
    console.log(`Updated ${type} photo for job ${jobId}`);
    
    // Update localStorage
    const success = updateLocalStorageJobs(jobId, type, imageUrl);
    
    // If this is an after photo and job is in_progress, let user know they can now complete the job
    if (success && type === "after") {
      const job = jobs.find(j => j.id === jobId);
      if (job?.status === "in_progress") {
        toast({
          title: "After photo added",
          description: "You can now mark this job as complete.",
          variant: "default",
        });
      }
    }
  };

  // Function to handle accepting high priority jobs
  const handleAcceptJob = (jobId: string) => {
    // Update the UI
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            accepted: true
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = updateJobAcceptance(jobId);
    
    if (success) {
      toast({
        title: "Job Accepted",
        description: "You have accepted this high-priority job. It will be prioritized in your work queue.",
        variant: "default",
      });
    }
  };
  
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
  
  // Function to handle updating job priority
  const handleUpdateJobPriority = (jobId: string, priority: string) => {
    // Update the UI
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            priority: priority
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = updateJobPriority(jobId, priority);
    
    if (success) {
      toast({
        title: "Priority updated",
        description: `Job priority changed to ${priority}`,
        variant: "default",
      });
    }
  };
  
  return {
    jobs,
    setJobs,
    handleJobPhotoUpdate,
    handleAcceptJob,
    handleUpdateJobStatus,
    handleUpdateJobPriority
  };
};
