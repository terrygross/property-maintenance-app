
import { useState, useEffect, useRef } from "react";
import { useAppState } from "@/context/AppStateContext";
import { notifyTechnicianTeam } from "@/services/NotificationService";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";
import { JobCardProps } from "@/components/job/jobCardTypes";

export const useReporterJobs = () => {
  const [jobCards, setJobCards] = useState<JobCardProps[]>([]);
  const { users } = useAppState();
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);
  const lastFetchTime = useRef<number>(0);
  const MIN_FETCH_INTERVAL = 1000; // Minimum 1 second between fetches

  // Load job cards from Supabase
  useEffect(() => {
    const loadReporterJobs = async () => {
      // Prevent too frequent refreshes
      const now = Date.now();
      if (!isInitialLoad.current && now - lastFetchTime.current < MIN_FETCH_INTERVAL) {
        console.log("useReporterJobs - Skipping fetch, too soon since last fetch");
        return;
      }
      
      try {
        if (isInitialLoad.current || isLoading) {
          setIsLoading(true);
        }
        
        console.log("useReporterJobs - Loading jobs from Supabase");
        lastFetchTime.current = now;
        
        // Fetch unassigned jobs from Supabase - using or() to combine conditions
        const { data: jobs, error } = await reporterJobsTable()
          .select('*')
          .or('status.eq.unassigned,assigned_to.is.null')
          .neq('status', 'completed');
        
        if (error) {
          throw error;
        }
        
        console.log("useReporterJobs - Fetched jobs data:", jobs);
        
        if (!jobs || jobs.length === 0) {
          console.log("useReporterJobs - No unassigned jobs found");
          setJobCards([]);
          setIsLoading(false);
          isInitialLoad.current = false;
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
          
          // Ensure we create a valid JobCardProps object
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
            notificationSent: job.notification_sent || false
          } as JobCardProps;
        });
        
        console.log("useReporterJobs - Processed jobs:", jobsWithPhotos);
        console.log("useReporterJobs - High priority count:", 
          jobsWithPhotos.filter(j => j.priority === "high" || j.highPriority).length);
        
        // Set the job cards
        setJobCards(jobsWithPhotos);
        console.log("useReporterJobs - Final job cards array set:", jobsWithPhotos.length);
        
        // Store jobs in localStorage for fallback
        try {
          localStorage.setItem('reporterJobs', JSON.stringify(jobsWithPhotos));
        } catch (storageError) {
          console.error("Failed to store jobs in localStorage:", storageError);
        }
        
        // Notify about high priority jobs when they're first loaded - only on initial load
        if (isInitialLoad.current) {
          const highPriorityJobs = jobsWithPhotos.filter((job) => 
            (job.priority === "high" || job.highPriority === true) && 
            !job.notificationSent
          );
          
          // Mark high priority jobs as notified
          if (highPriorityJobs.length > 0) {
            // Get all technicians
            const technicians = users.filter(user => 
              user.role === "maintenance_tech" || user.role === "contractor"
            );
            
            // Send notifications for each high priority job
            for (const job of highPriorityJobs) {
              try {
                notifyTechnicianTeam(technicians, job.title, job.property);
                
                // Mark job as notified in Supabase
                await reporterJobsTable()
                  .update({ notification_sent: true })
                  .eq('id', job.id);
                  
                console.log(`Marked job ${job.id} as notified`);
              } catch (notifyError) {
                console.error("Failed to send notification or mark job as notified:", notifyError);
              }
            }
          }
        }
      } catch (error) {
        console.error("useReporterJobs - Error loading reporter jobs:", error);
        // If there's an error, fall back to empty array
        setJobCards([]);
      } finally {
        setIsLoading(false);
        isInitialLoad.current = false;
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
    
    // Setup a listener for manual refreshes with debounce
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
