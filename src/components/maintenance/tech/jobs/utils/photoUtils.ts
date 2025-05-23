/**
 * Utility functions related to job photos
 */

/**
 * Updates job photos in localStorage
 */
export const updateLocalStorageJobs = (jobId: string, type: "before" | "after" | "reporter", imageUrl: string) => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          // Create or update the photos object with the correct structure
          return {
            ...job,
            photos: {
              ...(job.photos || {}),
              [type]: imageUrl,
            },
            // Keep backward compatibility with old code
            ...(type === "before" ? { beforePhoto: imageUrl } : {}),
            ...(type === "after" ? { afterPhoto: imageUrl } : {}),
            // Also update imageUrl for reporter photos to ensure backward compatibility
            ...(type === "reporter" ? { imageUrl } : {})
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      
      // Trigger a storage event to notify other components about the update
      window.dispatchEvent(new Event('storage'));
      // Dispatch a custom event to notify specifically about job updates
      document.dispatchEvent(new Event('jobsUpdated'));
      
      console.log(`Updated ${type} photo for job ${jobId}`);
      return true;
    }
  } catch (error) {
    console.error("Error updating job photos in localStorage:", error);
  }
  return false;
};

/**
 * Gets all photos for a job
 */
export const getJobPhotos = (jobId: string) => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const job = parsedJobs.find((job: any) => job.id === jobId);
      
      if (job) {
        // Create a standardized photos object
        return {
          reporter: job.photos?.reporter || job.imageUrl || undefined,
          before: job.photos?.before || job.beforePhoto || undefined,
          after: job.photos?.after || job.afterPhoto || undefined
        };
      }
    }
  } catch (error) {
    console.error("Error getting job photos:", error);
  }
  return { reporter: undefined, before: undefined, after: undefined };
};

/**
 * Checks if an after photo exists for a given job
 */
export const checkAfterPhotoForCompletion = (jobId: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const job = parsedJobs.find((job: any) => job.id === jobId);
      
      if (job) {
        // Check both photo structures (for backward compatibility)
        return (job.photos?.after || job.afterPhoto) ? true : false;
      }
    }
  } catch (error) {
    console.error("Error checking after photo for job completion:", error);
  }
  return false;
};
