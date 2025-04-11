
import { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { notifyTechnicianTeam } from "@/services/NotificationService";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";
import { JobCardProps } from "@/components/job/jobCardTypes";

export const useReporterJobs = () => {
  const [jobCards, setJobCards] = useState<JobCardProps[]>([]);
  const { users } = useAppState();
  const [isLoading, setIsLoading] = useState(true);

  // Load job cards from Supabase
  useEffect(() => {
    const loadReporterJobs = async () => {
      try {
        setIsLoading(true);
        console.log("useReporterJobs - Loading jobs from Supabase");
        
        // Fetch unassigned jobs from Supabase
        const { data: jobs, error } = await reporterJobsTable()
          .select('*')
          .or('status.eq.unassigned,assigned_to.is.null')
          .neq('status', 'completed');
        
        if (error) {
          throw error;
        }
        
        console.log("useReporterJobs - Fetched jobs:", jobs);
        
        if (!jobs || jobs.length === 0) {
          console.log("useReporterJobs - No unassigned jobs found");
          setJobCards([]);
          setIsLoading(false);
          return;
        }
        
        // Map the jobs to include priority and other required properties
        const jobsWithPhotos = jobs.map((job) => {
          // Convert string priority to the correct enum type
          let typedPriority: "low" | "medium" | "high" = "medium";
          if (job.priority === "high" || job.high_priority === true) {
            typedPriority = "high";
          } else if (job.priority === "low") {
            typedPriority = "low";
          }
          
          return {
            id: job.id,
            title: job.title || "Maintenance Request",
            description: job.description || "",
            property: job.property || "Unknown Property",
            reportDate: new Date(job.report_date).toISOString().split("T")[0],
            priority: typedPriority,
            status: job.status || "unassigned",
            reporterPhoto: job.image_url, 
            imageUrl: job.image_url,
            highPriority: job.high_priority === true || job.priority === "high",
            // Adding this flag to track notifications
            notificationSent: job.notification_sent || false
          } as JobCardProps;
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
          for (const job of highPriorityJobs) {
            notifyTechnicianTeam(technicians, job.title, job.property);
            
            // Mark job as notified in Supabase
            try {
              await reporterJobsTable()
                .update({ notification_sent: true })
                .eq('id', job.id);
                
              console.log(`Marked job ${job.id} as notified`);
            } catch (updateError) {
              console.error("Failed to mark job as notified:", updateError);
            }
          }
          
          // Also save to localStorage for compatibility
          try {
            const savedJobs = localStorage.getItem('reporterJobs') || '[]';
            let parsedJobs = JSON.parse(savedJobs);
            
            // Update notification status for these jobs in localStorage
            highPriorityJobs.forEach(job => {
              parsedJobs = parsedJobs.map((localJob: any) => {
                if (localJob.id === job.id) {
                  return {
                    ...localJob,
                    notificationSent: true
                  };
                }
                return localJob;
              });
            });
            
            localStorage.setItem('reporterJobs', JSON.stringify(parsedJobs));
          } catch (storageError) {
            console.error("Error updating localStorage:", storageError);
          }
        }
        
        // Log detailed job info for debugging
        console.log("useReporterJobs - Final jobs with high priority:", jobsWithPhotos.filter(j => 
          j.priority === "high" || j.highPriority === true
        ).length);
        
        setJobCards(jobsWithPhotos);
        console.log("useReporterJobs - Final job cards array length:", jobsWithPhotos.length);
      } catch (error) {
        console.error("useReporterJobs - Error loading reporter jobs:", error);
        // If there's an error, fall back to empty array
        setJobCards([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Load jobs initially
    loadReporterJobs();
    
    // Setup a listener for Supabase realtime updates
    const channel = supabase
      .channel('reporter-jobs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'reporter_jobs' }, 
        (payload) => {
          console.log("useReporterJobs - Supabase realtime update received:", payload);
          loadReporterJobs();
        }
      )
      .subscribe();
    
    // Setup a listener for manual refreshes
    const handleJobUpdated = () => {
      console.log("useReporterJobs - Manual jobs update event received");
      loadReporterJobs();
    };
    
    document.addEventListener('jobsUpdated', handleJobUpdated);
    document.addEventListener('highPriorityJobAdded', handleJobUpdated);
    
    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('jobsUpdated', handleJobUpdated);
      document.removeEventListener('highPriorityJobAdded', handleJobUpdated);
    };
  }, [users]);

  return { jobCards, setJobCards, isLoading };
};
