
/**
 * Utilities for loading high priority jobs from localStorage
 */
import { HighPriorityJob } from "./types";

/**
 * Loads high priority jobs for a technician from localStorage
 */
export const loadHighPriorityJobs = (userId: string): HighPriorityJob[] => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      // Filter to only show assigned high priority jobs for this technician that are not accepted
      const highPriorityAssigned = parsedJobs
        .filter((job: any) => 
          job.priority === "high" && 
          job.status === "assigned" && 
          job.assignedTo === userId &&
          !job.accepted
        )
        .map((job: any) => ({
          id: job.id,
          title: job.title,
          location: job.property || job.location,
          priority: job.priority,
          status: job.status,
          assignedTo: job.assignedTo,
          dueDate: new Date(job.dueDate || Date.now()),
          accepted: job.accepted || false,
          alertShown: job.alertShown || false,
          photos: {
            before: job.beforePhoto || "",
            after: job.afterPhoto || "",
            reporter: job.imageUrl || ""
          }
        }));
      
      return highPriorityAssigned;
    }
  } catch (error) {
    console.error("Error loading high priority jobs:", error);
  }
  
  return [];
};

/**
 * Marks high priority jobs as shown in localStorage to prevent duplicate notifications
 */
export const markHighPriorityJobsAsShown = (highPriorityJobs: HighPriorityJob[]): void => {
  try {
    if (highPriorityJobs.length === 0) return;
    
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const jobIds = highPriorityJobs.map(job => job.id);
      
      // Mark jobs as shown
      const updatedJobs = parsedJobs.map((job: any) => 
        jobIds.includes(job.id) ? { ...job, alertShown: true } : job
      );
      
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
    }
  } catch (error) {
    console.error("Error marking high priority jobs as shown:", error);
  }
};

