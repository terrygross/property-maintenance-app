/**
 * Utility functions related to job photos
 */

/**
 * Updates job photos in localStorage
 */
export const updateLocalStorageJobs = (jobId: string, type: "before" | "after", imageUrl: string) => {
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
              // Preserve reporter photo if it exists
              reporter: job.photos?.reporter || job.imageUrl || undefined
            },
            // Keep backward compatibility with old code
            [type === "before" ? "beforePhoto" : "afterPhoto"]: imageUrl
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
