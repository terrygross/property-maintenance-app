
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
          // Ensure photos have the right structure
          const photos = {
            reporter: job.photos?.reporter || job.imageUrl || undefined,
            before: job.photos?.before || job.beforePhoto || undefined,
            after: job.photos?.after || job.afterPhoto || undefined
          };
          
          return {
            id: job.id,
            title: job.title || job.description,
            location: job.property || job.location,
            priority: job.priority || "medium",
            dueDate: new Date(job.dueDate || job.reportDate || Date.now()),
            status: job.status || "assigned",
            assignedTo: job.assignedTo,
            accepted: job.accepted || false,
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
  return [
    {
      id: "j1",
      title: "Fix leaking pipe",
      location: "Building A, Apt 101",
      priority: "high",
      dueDate: new Date(Date.now() + 86400000),
      status: "assigned",
      assignedTo: "1",
      accepted: false,
      photos: {
        reporter: "https://placehold.co/600x400?text=Leaking+Pipe"
      }
    },
    {
      id: "j2",
      title: "Replace broken window",
      location: "Building B, Apt 205",
      priority: "medium",
      dueDate: new Date(Date.now() + 172800000),
      status: "assigned",
      assignedTo: "1",
      accepted: true,
      photos: {
        reporter: "https://placehold.co/600x400?text=Broken+Window"
      }
    }
  ];
};
