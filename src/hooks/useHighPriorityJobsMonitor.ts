
/**
 * Hook for monitoring high priority jobs across all technicians
 * This is used in the admin dashboard
 */

import { useState, useEffect } from "react";
import { HighPriorityJob } from "./highPriorityJobs/types";

export const useHighPriorityJobsMonitor = () => {
  const [highPriorityJobs, setHighPriorityJobs] = useState<HighPriorityJob[]>([]);

  useEffect(() => {
    const monitorHighPriorityJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          // Get all high priority jobs regardless of technician
          const highPriorityJobs = parsedJobs
            .filter((job: any) => 
              job.priority === "high" || 
              job.highPriority === true  // Add this check for highPriority flag
            )
            .map((job: any) => ({
              id: job.id,
              title: job.title,
              location: job.property || job.location,
              priority: job.priority || "high",
              status: job.status || "unassigned",
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
          
          setHighPriorityJobs(highPriorityJobs);
          console.log("Found high priority jobs:", highPriorityJobs.length);
        }
      } catch (error) {
        console.error("Error monitoring high priority jobs:", error);
      }
    };
    
    // Initial check
    monitorHighPriorityJobs();
    
    // Set up periodic checks
    const interval = setInterval(monitorHighPriorityJobs, 3000); // Check every 3 seconds
    
    // Listen for storage events to update jobs when they change
    const handleStorageChange = () => {
      monitorHighPriorityJobs();
    };
    
    // Listen for custom events as well
    const handleJobsUpdated = () => {
      monitorHighPriorityJobs();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('jobsUpdated', handleJobsUpdated as EventListener);
    
    // Clean up on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('jobsUpdated', handleJobsUpdated as EventListener);
    };
  }, []);

  return highPriorityJobs;
};
