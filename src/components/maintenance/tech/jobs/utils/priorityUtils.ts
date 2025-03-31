
/**
 * Utility functions related to job priorities
 */

/**
 * Gets the appropriate Tailwind color class for a job priority
 */
export const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-500 hover:bg-red-600 text-white";
    case "medium":
      return "bg-amber-500 hover:bg-amber-600 text-white";
    case "low":
      return "bg-green-500 hover:bg-green-600 text-white";
    default:
      return "bg-blue-500 hover:bg-blue-600 text-white";
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
