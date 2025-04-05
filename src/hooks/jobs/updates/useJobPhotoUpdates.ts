
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  updateLocalStorageJobs, 
  getJobPhotos 
} from "@/components/maintenance/tech/jobs/utils/photoUtils";

export const useJobPhotoUpdates = (setJobs: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { toast } = useToast();
  
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
        setJobs(prev => {
          const job = prev.find(j => j.id === jobId);
          if (job?.status === "in_progress") {
            toast({
              title: "After photo added",
              description: "You can now mark this job as complete.",
              variant: "default",
            });
          }
          return prev;
        });
      }
    }
  };

  return { handleJobPhotoUpdate };
};
