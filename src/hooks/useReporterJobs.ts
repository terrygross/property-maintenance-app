
import { useState, useEffect } from "react";
import { JobCardProps } from "@/components/job/jobCardTypes";
import { useAppState } from "@/context/AppStateContext";

export const useReporterJobs = () => {
  const [jobCards, setJobCards] = useState<JobCardProps[]>([]);
  const { users } = useAppState();

  // Load job cards from localStorage
  useEffect(() => {
    const loadReporterJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          
          // Include only unassigned jobs
          const relevantJobs = parsedJobs.filter((job: any) => 
            job.status === "unassigned"
          );
          
          // Map the jobs to include the reporter photo
          const jobsWithPhotos = relevantJobs.map((job: any) => ({
            ...job,
            reporterPhoto: job.imageUrl // Include the imageUrl as reporterPhoto
          }));
          
          setJobCards(jobsWithPhotos);
          console.log("Loaded reporter jobs:", jobsWithPhotos);
        }
      } catch (error) {
        console.error("Error loading reporter jobs:", error);
        // If there's an error, fall back to empty array
        setJobCards([]);
      }
    };
    
    loadReporterJobs();
    
    // Setup a listener for localStorage changes to refresh jobs list
    window.addEventListener('storage', loadReporterJobs);
    document.addEventListener('jobsUpdated', loadReporterJobs as EventListener);
    
    return () => {
      window.removeEventListener('storage', loadReporterJobs);
      document.removeEventListener('jobsUpdated', loadReporterJobs as EventListener);
    };
  }, [users]);

  return { jobCards, setJobCards };
};
