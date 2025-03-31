
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
          return {
            ...job,
            [type === "before" ? "beforePhoto" : "afterPhoto"]: imageUrl
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
    }
  } catch (error) {
    console.error("Error updating job photos in localStorage:", error);
  }
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
      
      if (job && job.afterPhoto) {
        return true;
      }
    }
  } catch (error) {
    console.error("Error checking after photo for job completion:", error);
  }
  return false;
};
