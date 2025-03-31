
/**
 * Utility functions related to job priorities
 */

/**
 * Returns the appropriate background color class for a given priority level
 */
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

/**
 * Updates the priority of a job in localStorage
 */
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
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      return true;
    }
  } catch (error) {
    console.error("Error updating job priority in localStorage:", error);
  }
  return false;
};
