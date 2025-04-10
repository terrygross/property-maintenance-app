
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
        // Direct check of localStorage content for debugging
        console.log("DIRECT CHECK - All localStorage keys:", Object.keys(localStorage));
        const rawJobsData = localStorage.getItem('reporterJobs');
        console.log("DIRECT CHECK - Raw jobs data exists:", !!rawJobsData);
        if (rawJobsData) {
          console.log("DIRECT CHECK - Raw jobs data length:", rawJobsData.length);
          console.log("DIRECT CHECK - First 100 chars:", rawJobsData.substring(0, 100));
          
          // Attempt to parse and log the entire data
          try {
            const allData = JSON.parse(rawJobsData);
            console.log("DIRECT CHECK - All localStorage jobs:", allData);
            console.log("DIRECT CHECK - Total jobs count:", allData.length);
            
            // Log each job's status and priority for debugging
            allData.forEach((job: any, index: number) => {
              console.log(`Job ${index}: id=${job.id}, status=${job.status}, assignedTo=${job.assignedTo}, priority=${job.priority}, highPriority=${job.highPriority}`);
            });
          } catch (e) {
            console.error("DIRECT CHECK - Error parsing full data:", e);
          }
        }

        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          
          console.log("useReporterJobs - All jobs in storage:", parsedJobs.length);
          if (parsedJobs.length > 0) {
            console.log("useReporterJobs - First job in storage:", parsedJobs[0]);
          }
          
          // Filter out jobs that are completed or already assigned to technicians
          const unassignedJobs = parsedJobs.filter((job: any) => 
            // A job is unassigned if:
            // 1. It has no assignedTo property OR
            // 2. Its status is explicitly "unassigned" OR
            // 3. It has no status property (legacy jobs)
            // AND it's not completed
            (!job.assignedTo || job.status === "unassigned" || !job.status) &&
            job.status !== "completed"
          );
          
          console.log("useReporterJobs - Filtered unassigned jobs:", unassignedJobs.length);
          if (unassignedJobs.length > 0) {
            console.log("useReporterJobs - All unassigned jobs:", unassignedJobs);
          }
          
          if (unassignedJobs.length === 0) {
            console.log("useReporterJobs - No unassigned jobs found in localStorage");
            console.log("useReporterJobs - All jobs statuses:", parsedJobs.map((j: any) => j.status));
          } else {
            console.log("useReporterJobs - First unassigned job:", unassignedJobs[0]);
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
              console.log("useReporterJobs - Found high priority job:", job.id, "priority:", priority, "highPriority:", highPriorityFlag);
            }
            
            return {
              id: job.id || `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              title: job.title || "Maintenance Request",
              description: job.description || "",
              property: job.property || "Unknown Property",
              reportDate: job.reportDate || new Date().toISOString().split("T")[0],
              priority: priority,
              status: job.status || "unassigned",
              reporterPhoto: job.imageUrl, // Include the imageUrl as reporterPhoto
              imageUrl: job.imageUrl, // Also keep imageUrl for backward compatibility
              highPriority: highPriorityFlag // Ensure highPriority flag matches priority
            };
          });
          
          // Notify about high priority jobs when they're first loaded
          const highPriorityJobs = jobsWithPhotos.filter((job) => 
            (job.priority === "high" || job.highPriority === true) && 
            !job.notificationSent
          );
          
          console.log("useReporterJobs - High priority jobs that need notification:", highPriorityJobs.length);
          
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
          console.log("useReporterJobs - Final jobs with high priority:", jobsWithPhotos.filter(j => 
            j.priority === "high" || j.highPriority === true
          ).length);
          
          setJobCards(jobsWithPhotos);
          console.log("useReporterJobs - Final job cards array length:", jobsWithPhotos.length);
          
          // Trigger refresh event to ensure admin dashboard updates
          document.dispatchEvent(new CustomEvent('jobsUpdated'));
        } else {
          console.log("useReporterJobs - No reporter jobs found in localStorage");
          setJobCards([]);
        }
      } catch (error) {
        console.error("useReporterJobs - Error loading reporter jobs:", error);
        // If there's an error, fall back to empty array
        setJobCards([]);
      }
    };
    
    // Load jobs initially
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
