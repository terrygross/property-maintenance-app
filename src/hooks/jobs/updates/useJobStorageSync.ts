
import { useEffect } from "react";
import { getJobPhotos } from "@/components/maintenance/tech/jobs/utils/photoUtils";

export const useJobStorageSync = (
  setJobs: React.Dispatch<React.SetStateAction<any[]>>
) => {
  // Effect to refresh job photos periodically
  useEffect(() => {
    const refreshJobPhotos = () => {
      setJobs(prevJobs => 
        prevJobs.map(job => {
          const updatedPhotos = getJobPhotos(job.id);
          return {
            ...job,
            photos: updatedPhotos
          };
        })
      );
    };
    
    // Listen for storage events to refresh job photos
    const handleStorageChange = () => {
      refreshJobPhotos();
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('jobsUpdated', handleStorageChange as EventListener);
    
    // Initial refresh
    refreshJobPhotos();
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('jobsUpdated', handleStorageChange as EventListener);
    };
  }, [setJobs]);
};
