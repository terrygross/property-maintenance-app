
import { useState, useEffect } from "react";
import { JobCardProps } from "@/components/job/jobCardTypes";
import { useAppState } from "@/context/AppStateContext";
import { notifyTechnicianTeam } from "@/services/NotificationService";

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
          } else {
            console.log("First unassigned job:", unassignedJobs[0]);
          }
          
          // Map the jobs to include priority and other required properties
          const jobsWithPhotos = unassignedJobs.map((job: any) => {
            // Convert highPriority flag to priority value if needed
            let priority = job.priority || "medium";
            let highPriorityFlag = job.highPriority === true;
            
            if (highPriorityFlag && priority !== "high") {
              priority = "high";
            } else if (priority === "high" && !highPriorityFlag) {
              highPriorityFlag = true;
            }
            
            // Log for debugging
            if (priority === "high" || highPriorityFlag) {
              console.log("Found high priority job:", job.id, "priority:", priority, "highPriority:", highPriorityFlag);
            }
            
            return {
              id: job.id,
              title: job.title || "Maintenance Request",
              description: job.description || "",
              property: job.property || "Unknown Property",
              reportDate: job.reportDate || new Date().toISOString().split("T")[0],
              priority: priority,
              status: job.status || "unassigned",
              reporterPhoto: job.imageUrl, // Include the imageUrl as reporterPhoto
              imageUrl: job.imageUrl, // Also keep imageUrl for backward compatibility
              highPriority: highPriorityFlag, // Ensure highPriority flag matches priority
              notificationSent: job.notificationSent || false
            };
          });
          
          // Notify about high priority jobs when they're first loaded
          const highPriorityJobs = jobsWithPhotos.filter((job) => 
            (job.priority === "high" || job.highPriority === true) && 
            !job.notificationSent
          );
          
          console.log("High priority jobs that need notification:", highPriorityJobs.length);
          
          if (highPriorityJobs.length > 0) {
            // Get all technicians
            const technicians = users.filter(user => 
              user.role === "maintenance_tech" || user.role === "contractor"
            );
            
            // Send notifications for each high priority job
            highPriorityJobs.forEach((job) => {
              notifyTechnicianTeam(technicians, job.title, job.property);
              
              // Mark job as notified so we don't send duplicate notifications
              const savedJobs = localStorage.getItem('reporterJobs');
              if (savedJobs) {
                const allJobs = JSON.parse(savedJobs);
                const updatedJobs = allJobs.map((j: any) => 
                  j.id === job.id ? { ...j, notificationSent: true } : j
                );
                localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
              }
            });
          }
          
          // Log detailed job info for debugging
          console.log("Jobs with high priority:", jobsWithPhotos.filter(j => 
            j.priority === "high" || j.highPriority === true
          ).length);
          
          setJobCards(jobsWithPhotos);
          console.log("Loaded reporter jobs:", jobsWithPhotos.length);
          
          // Always dispatch an event when jobs are loaded to ensure UI updates
          document.dispatchEvent(new CustomEvent('jobsUpdated'));
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
