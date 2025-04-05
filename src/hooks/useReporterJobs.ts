
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
          
          console.log("All jobs in storage:", parsedJobs.length);
          
          // Filter out jobs that are completed or already assigned to technicians
          const unassignedJobs = parsedJobs.filter((job: any) => 
            (!job.assignedTo || job.status === "unassigned" || !job.status) &&
            job.status !== "completed"
          );
          
          console.log("Filtered unassigned jobs:", unassignedJobs.length);
          
          if (unassignedJobs.length === 0) {
            console.log("No unassigned jobs found in localStorage");
          }
          
          // Map the jobs to include the reporter photo
          const jobsWithPhotos = unassignedJobs.map((job: any) => ({
            id: job.id,
            title: job.title || "Maintenance Request",
            description: job.description || "",
            property: job.property || "Unknown Property",
            reportDate: job.reportDate || new Date().toISOString().split("T")[0],
            priority: job.priority || "medium",
            status: job.status || "unassigned",
            reporterPhoto: job.imageUrl, // Include the imageUrl as reporterPhoto
            imageUrl: job.imageUrl // Also keep imageUrl for backward compatibility
          }));
          
          setJobCards(jobsWithPhotos);
          console.log("Loaded reporter jobs:", jobsWithPhotos.length);
        } else {
          console.log("No reporter jobs found in localStorage");
          setJobCards([]);
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
