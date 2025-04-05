
/**
 * Utility functions related to job statuses
 */

import { checkAfterPhotoForCompletion } from './photoUtils';

/**
 * Updates the acceptance status of a job in localStorage
 */
export const updateJobAcceptance = (jobId: string) => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            accepted: true,
            alertShown: true // Prevent further alerts for this job
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      
      // Dispatch events to notify all components
      document.dispatchEvent(new Event('jobsUpdated'));
      window.dispatchEvent(new Event('storage'));
      return true;
    }
  } catch (error) {
    console.error("Error updating job acceptance in localStorage:", error);
  }
  return false;
};

/**
 * Updates the status of a job in localStorage
 */
export const updateJobStatus = (jobId: string, status: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      
      // If trying to mark as completed, check for after photo
      if (status === "completed") {
        const job = parsedJobs.find((job: any) => job.id === jobId);
        if (job && !job.afterPhoto) {
          console.log("Cannot complete job without after photo");
          return false;
        }
      }
      
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: status
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      
      // Dispatch events to notify all components
      document.dispatchEvent(new Event('jobsUpdated'));
      window.dispatchEvent(new Event('storage'));
      
      return true;
    }
  } catch (error) {
    console.error("Error updating job status in localStorage:", error);
  }
  return false;
};
