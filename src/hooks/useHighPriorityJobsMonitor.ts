
/**
 * Hook for monitoring high priority jobs across all technicians
 * This is used in the admin dashboard
 */

import { useState, useEffect } from "react";
import { HighPriorityJob } from "./highPriorityJobs/types";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

export const useHighPriorityJobsMonitor = () => {
  const [highPriorityJobs, setHighPriorityJobs] = useState<HighPriorityJob[]>([]);

  useEffect(() => {
    const fetchHighPriorityJobs = async () => {
      try {
        // Fetch high priority jobs from Supabase
        const { data, error } = await reporterJobsTable()
          .select('*')
          .or('high_priority.eq.true,priority.eq.high');
          
        if (error) throw error;
        
        if (!data) {
          console.log("No high priority jobs found");
          setHighPriorityJobs([]);
          return;
        }
        
        // Convert to the expected format
        const formattedJobs = data.map(job => ({
          id: job.id,
          title: job.title,
          location: job.property || job.location,
          priority: job.priority || "high",
          status: job.status || "unassigned",
          assignedTo: job.assigned_to,
          dueDate: new Date(job.due_date || job.report_date || Date.now()),
          accepted: job.accepted || false,
          alertShown: job.notification_sent || false,
          photos: {
            before: job.before_photo || "",
            after: job.after_photo || "",
            reporter: job.image_url || ""
          }
        }));
        
        setHighPriorityJobs(formattedJobs);
        console.log("Found high priority jobs:", formattedJobs.length);
      } catch (error) {
        console.error("Error monitoring high priority jobs:", error);
        setHighPriorityJobs([]);
      }
    };
    
    // Initial fetch
    fetchHighPriorityJobs();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('high-priority-jobs')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'reporter_jobs',
          filter: 'high_priority=eq.true' 
        }, 
        () => {
          console.log("High priority job realtime update received");
          fetchHighPriorityJobs();
        }
      )
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'reporter_jobs',
          filter: 'priority=eq.high' 
        }, 
        () => {
          console.log("High priority job realtime update received");
          fetchHighPriorityJobs();
        }
      )
      .subscribe();
    
    // Handle job update events
    const handleJobsUpdated = () => {
      fetchHighPriorityJobs();
    };
    
    document.addEventListener('jobsUpdated', handleJobsUpdated);
    document.addEventListener('highPriorityJobAdded', handleJobsUpdated);
    
    // Clean up on unmount
    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('jobsUpdated', handleJobsUpdated);
      document.removeEventListener('highPriorityJobAdded', handleJobsUpdated);
    };
  }, []);

  return highPriorityJobs;
};
