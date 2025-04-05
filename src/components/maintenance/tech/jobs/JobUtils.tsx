/**
 * Re-export all job utilities from their respective modules
 * This file is kept for backward compatibility
 */

export * from './utils/priorityUtils';
export * from './utils/photoUtils';
export * from './utils/statusUtils';
export * from './utils/technicianUtils';

export const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-orange-500 text-white";
    case "low":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export const updateJobStatus = (jobId: string, status: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      
      // If trying to mark as completed, check for after photo
      if (status === "completed") {
        const job = parsedJobs.find((job: any) => job.id === jobId);
        if (job && !job.photos?.after && !job.afterPhoto) {
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
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      return true;
    }
  } catch (error) {
    console.error("Error updating job status in localStorage:", error);
  }
  return false;
};

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
      return true;
    }
  } catch (error) {
    console.error("Error updating job acceptance in localStorage:", error);
  }
  return false;
};

export const updateJobPriority = (jobId: string, priority: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            priority: priority
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      return true;
    }
  } catch (error) {
    console.error("Error updating job priority in localStorage:", error);
  }
  return false;
};

export const addJobComment = (jobId: string, comment: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          // Create comments array if it doesn't exist
          const existingComments = job.comments || [];
          return {
            ...job,
            comments: [...existingComments, comment]
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      return true;
    }
  } catch (error) {
    console.error("Error adding job comment in localStorage:", error);
  }
  return false;
};
