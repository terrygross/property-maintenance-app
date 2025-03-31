
import { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Job } from "@/hooks/jobs/types";

/**
 * Custom hook to load jobs data from localStorage
 */
export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { users } = useAppState();
  
  useEffect(() => {
    try {
      const loadJobs = () => {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          const formattedJobs = parsedJobs
            .filter((job: any) => job.status !== "unassigned")
            .map((job: any) => {
              const assignedTech = job.assignedTo ? 
                users.find((user: any) => user.id === job.assignedTo) : null;
              
              return {
                id: job.id,
                title: job.title,
                location: job.property,
                priority: job.priority || "medium",
                status: job.status,
                assignedTo: assignedTech ? 
                  `${assignedTech.first_name} ${assignedTech.last_name}` : 
                  "Unassigned",
                techId: job.assignedTo,
                techRole: assignedTech?.role || "",
                emailSent: job.emailSent || false,
                dueDate: new Date(new Date(job.reportDate).getTime() + 7 * 24 * 60 * 60 * 1000),
                photos: { 
                  reporter: job.imageUrl,
                  before: job.beforePhoto || "",
                  after: job.afterPhoto || ""
                }
              };
            });
          
          setJobs(formattedJobs);
          console.log("Admin Jobs tab - loaded assigned jobs:", formattedJobs);
        }
      };
      
      loadJobs();
      
      // Listen for storage events to update jobs when they change
      window.addEventListener('storage', loadJobs);
      
      return () => {
        window.removeEventListener('storage', loadJobs);
      };
    } catch (error) {
      console.error("Error loading assigned jobs:", error);
    }
  }, [users]);

  return { jobs, setJobs };
};
