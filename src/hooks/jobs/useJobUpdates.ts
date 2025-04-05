
/**
 * Hook for handling job update operations
 */
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Job } from "./types";
import { 
  updateJobAcceptance, 
  updateJobStatus, 
  updateJobPriority,
  addJobComment
} from "@/components/maintenance/tech/jobs/JobUtils";
import { 
  updateLocalStorageJobs, 
  getJobPhotos 
} from "@/components/maintenance/tech/jobs/utils/photoUtils";

export const useJobUpdates = (initialJobs: Job[]) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const { toast } = useToast();
  
  // Effect to refresh job photos periodically
  useEffect(() => {
    const refreshJobPhotos = () => {
      setJobs(prevJobs => 
        prevJobs.map(job => {
          const updatedPhotos = getJobPhotos(job.id);
          return {
            ...job,
            photos: updatedPhotos
          };
        })
      );
    };
    
    // Listen for storage events to refresh job photos
    const handleStorageChange = () => {
      refreshJobPhotos();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('jobsUpdated', handleStorageChange as EventListener);
    
    // Initial refresh
    refreshJobPhotos();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('jobsUpdated', handleStorageChange as EventListener);
    };
  }, []);
  
  // Function to handle photo updates for jobs
  const handleJobPhotoUpdate = (jobId: string, type: "before" | "after", imageUrl: string) => {
    // Update localStorage first
    const success = updateLocalStorageJobs(jobId, type, imageUrl);
    
    if (success) {
      // Get the latest photos after the update
      const updatedPhotos = getJobPhotos(jobId);
      
      // Update the UI state with all photos
      setJobs(prev => 
        prev.map(job => {
          if (job.id === jobId) {
            return {
              ...job,
              photos: updatedPhotos
            };
          }
          return job;
        })
      );
      
      toast({
        title: "Photo updated",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} photo has been saved.`,
      });
      
      console.log(`Updated ${type} photo for job ${jobId}`, updatedPhotos);
      
      // If this is an after photo and job is in_progress, let user know they can now complete the job
      if (type === "after") {
        const job = jobs.find(j => j.id === jobId);
        if (job?.status === "in_progress") {
          toast({
            title: "After photo added",
            description: "You can now mark this job as complete.",
            variant: "default",
          });
        }
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
      let message = "";
      switch(status) {
        case "in_progress":
          message = "You have marked this job as in progress.";
          break;
        case "on_hold":
          message = "You have marked this job as on hold (waiting for parts).";
          break;
        case "completed":
          message = "You have marked this job as complete.";
          break;
        default:
          message = `Job status updated to ${status}.`;
      }
      
      toast({
        title: `Status: ${status.replace('_', ' ')}`,
        description: message,
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
  
  // Function to handle adding comments to jobs
  const handleAddComment = (jobId: string, comment: string) => {
    // Update the UI
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          const existingComments = job.comments || [];
          return {
            ...job,
            comments: [...existingComments, comment]
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = addJobComment(jobId, comment);
    
    if (success) {
      toast({
        title: "Comment added",
        description: "Your note has been saved to the job.",
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
    handleUpdateJobPriority,
    handleAddComment
  };
};
