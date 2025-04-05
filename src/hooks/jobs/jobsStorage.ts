
/**
 * Utility functions for loading and saving jobs
 */
import { Job } from "./types";

/**
 * Load jobs from localStorage for a given user ID
 */
export const loadJobsFromStorage = (userId: string): Job[] => {
  try {
    // Try to load jobs from localStorage
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      
      // Filter jobs assigned to this user
      const userJobs = parsedJobs.filter((job: any) => 
        job.assignedTo === userId
      );
      
      if (userJobs.length > 0) {
        console.log("Found jobs for user:", userJobs);
        
        // Format jobs with proper structure
        return userJobs.map((job: any) => {
          // Ensure photos have the right structure by checking all possible locations
          const photos = {
            reporter: job.photos?.reporter || job.imageUrl || undefined,
            before: job.photos?.before || job.beforePhoto || undefined,
            after: job.photos?.after || job.afterPhoto || undefined
          };
          
          // Log the photo structure for debugging
          console.log(`Job ${job.id} photos:`, photos);
          
          return {
            id: job.id,
            title: job.title || job.description,
            location: job.property || job.location,
            priority: job.priority || "medium",
            dueDate: new Date(job.dueDate || job.reportDate || Date.now()),
            status: job.status || "assigned",
            assignedTo: job.assignedTo,
            accepted: job.accepted || false,
            comments: job.comments || [],
            photos: photos
          };
        });
      }
    }
  } catch (error) {
    console.error("Error loading jobs from localStorage:", error);
  }
  
  // Return empty array if no jobs found or error
  return [];
};

/**
 * Get mock jobs for demonstration purposes (when no real jobs exist)
 */
export const getMockJobs = (): Job[] => {
  // Return empty array - no more mock jobs
  return [];
};
