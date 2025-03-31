
/**
 * Utility functions related to technician jobs
 */

import { MOCK_USERS } from "@/data/mockUsers";
import { mockProperties } from "@/data/mockProperties";

/**
 * Gets jobs assigned to a specific technician
 */
export const getTechnicianJobs = (techId: string): any[] => {
  console.log(`Fetching jobs for technician: ${techId}`);
  
  // Try to get jobs from localStorage
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const allJobs = JSON.parse(savedJobs);
      // Filter ALL jobs assigned to this technician, regardless of status
      // This ensures that both "assigned", "in_progress", and "completed" jobs are shown
      const techJobs = allJobs.filter((job: any) => job.assignedTo === techId);
      
      console.log(`Found ${techJobs.length} jobs for technician ${techId} in localStorage:`, techJobs);
      
      if (techJobs.length > 0) {
        return techJobs;
      }
    }
  } catch (error) {
    console.error("Error getting technician jobs from localStorage:", error);
  }
  
  // If no jobs found, return empty array
  console.log(`No jobs found for technician ${techId}, returning empty array`);
  return [];
};
