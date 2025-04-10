
/**
 * Hook for managing assigned jobs for a technician
 */
import { useState, useEffect } from "react";
import { Job, UseAssignedJobsReturn } from "./types";
import { loadJobsFromStorage, getMockJobs } from "./jobsStorage";
import { useJobUpdates } from "./useJobUpdates";

export const useAssignedJobs = (currentUserId: string): UseAssignedJobsReturn => {
  // Initialize with mock jobs - these will be replaced if there are real jobs in storage
  const initialJobs = getMockJobs();
  
  // Use the job updates hook
  const { 
    jobs: assignedJobs, 
    setJobs: setAssignedJobs,
    handleJobPhotoUpdate, 
    handleAcceptJob, 
    handleUpdateJobStatus,
    handleUpdateJobPriority,
    handleAddComment
  } = useJobUpdates(initialJobs);

  useEffect(() => {
    // Load jobs when the component mounts
    const loadJobs = async () => {
      const jobs = await loadJobsFromStorage(currentUserId);
      if (jobs.length > 0) {
        // Replace mock data with real data from localStorage
        setAssignedJobs(jobs);
      }
    };
    
    loadJobs();
    
    // Set up event listeners for job updates
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing jobs for technician:", currentUserId);
      loadJobs();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('jobsUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('jobsUpdated', handleStorageChange as EventListener);
    };
  }, [currentUserId, setAssignedJobs]);

  return {
    assignedJobs,
    handleJobPhotoUpdate,
    handleAcceptJob,
    handleUpdateJobStatus,
    handleUpdateJobPriority,
    handleAddComment
  };
};
