
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
  
  // Get the technician's details
  const tech = MOCK_USERS.find(user => user.id === techId);
  console.log(`Technician details:`, tech);
  
  // Get active properties for realistic job assignments
  const activeProperties = mockProperties
    .filter(p => p.status === "active")
    .map(p => p.name);
  
  // Use a default property if no active properties are found
  const defaultProperty = activeProperties.length > 0 ? 
    activeProperties[0] : "Sunset Apartments";
  
  // Fallback to mock data if no jobs in localStorage
  // Generate some mock jobs for the technician
  const mockJobs = [
    { 
      id: `${techId}-job1`, 
      title: "Fix heating system", 
      property: defaultProperty, 
      priority: "high", 
      reportDate: new Date().toISOString(),
      status: "assigned",
      assignedTo: techId,
      accepted: false
    },
    { 
      id: `${techId}-job2`, 
      title: "Replace light fixtures", 
      property: activeProperties.length > 1 ? activeProperties[1] : defaultProperty, 
      priority: "medium",
      reportDate: new Date().toISOString(),
      status: "assigned",
      assignedTo: techId
    },
    { 
      id: `${techId}-job3`, 
      title: "Inspect water damage", 
      property: activeProperties.length > 2 ? activeProperties[2] : defaultProperty, 
      priority: "low",
      reportDate: new Date().toISOString(),
      status: "assigned",
      assignedTo: techId
    }
  ];
  
  console.log(`Returning mock jobs for technician ${techId} with valid property names:`, mockJobs);
  return mockJobs;
};
