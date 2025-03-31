
/**
 * Utilities for loading and updating jobs in localStorage
 */
import { Job } from "./types";

/**
 * Loads jobs for a specific technician from localStorage
 */
export const loadJobsFromStorage = (currentUserId: string): Job[] => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      if (parsedJobs.length > 0) {
        const techJobs = parsedJobs
          .filter((job: any) => 
            (job.status === "assigned" || job.status === "in_progress" || 
            (job.status === "completed" && job.assignedTo === currentUserId)) &&
            job.assignedTo === currentUserId // Filter specifically for this technician
          )
          .map((job: any) => ({
            id: job.id,
            title: job.title,
            location: job.property || job.location,
            priority: job.priority,
            dueDate: new Date(job.dueDate || Date.now()),
            photos: {
              before: job.beforePhoto || "",
              after: job.afterPhoto || "",
              reporter: job.imageUrl || ""
            },
            accepted: job.accepted || false,
            status: job.status || "assigned"
          }));
        
        if (techJobs.length > 0) {
          console.log(`Found ${techJobs.length} jobs for tech ID: ${currentUserId}`, techJobs);
          return techJobs;
        }
      }
    }
  } catch (error) {
    console.error("Error loading tech jobs:", error);
  }
  
  return [];
};

/**
 * Returns mock jobs if no real jobs are found
 */
export const getMockJobs = (): Job[] => {
  return [
    { 
      id: "j1", 
      title: "Fix heating system", 
      location: "Building A", 
      priority: "high", 
      dueDate: new Date(2023, 11, 30),
      photos: { before: "", after: "", reporter: "/images/broken-heater.jpg" },
      accepted: false,
      status: "assigned"
    },
    { 
      id: "j2", 
      title: "Replace light fixtures", 
      location: "Building C", 
      priority: "medium", 
      dueDate: new Date(2023, 12, 5),
      photos: { before: "", after: "", reporter: "/images/broken-light.jpg" },
      status: "assigned"
    },
    { 
      id: "j3", 
      title: "Inspect water damage", 
      location: "Building B", 
      priority: "low", 
      dueDate: new Date(2023, 12, 10),
      photos: { before: "", after: "", reporter: "/images/water-damage.jpg" },
      status: "assigned"
    },
    { 
      id: "j4", 
      title: "URGENT: Electrical hazard", 
      location: "Main Building", 
      priority: "high", 
      dueDate: new Date(), // Today
      photos: { before: "", after: "", reporter: "/images/electrical-hazard.jpg" },
      accepted: false,
      status: "assigned"
    }
  ];
};
