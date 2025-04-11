
import { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Job as JobType } from "@/hooks/jobs/types";
import { Job as JobListType } from "@/components/jobs/jobsListUtils";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

/**
 * Custom hook to load jobs data from Supabase
 */
export const useJobsData = () => {
  const [jobs, setJobs] = useState<JobListType[]>([]);
  const { users } = useAppState();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        console.log("Admin Jobs tab - Loading assigned jobs from Supabase");
        
        // Fetch assigned jobs from Supabase
        const { data, error } = await reporterJobsTable()
          .select('*')
          .neq('status', 'unassigned')
          .not('assigned_to', 'is', null);
        
        if (error) {
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log("Admin Jobs tab - No assigned jobs found");
          setJobs([]);
          setIsLoading(false);
          return;
        }
        
        console.log("Admin Jobs tab - Fetched assigned jobs:", data);
        
        // Format the jobs for the UI
        const formattedJobs = data.map((job) => {
          const assignedTech = job.assigned_to ? 
            users.find((user: any) => user.id === job.assigned_to) : null;
          
          return {
            id: job.id,
            title: job.title,
            location: job.property,
            priority: job.priority || "medium",
            status: job.status,
            assignedTo: assignedTech ? 
              `${assignedTech.first_name} ${assignedTech.last_name}` : 
              "Unassigned",
            techId: job.assigned_to,
            techRole: assignedTech?.role || "",
            emailSent: job.notification_sent || false,
            dueDate: new Date(new Date(job.report_date).getTime() + 7 * 24 * 60 * 60 * 1000),
            photos: { 
              reporter: job.image_url,
              before: "",  // These fields don't exist in the database yet
              after: ""    // These fields don't exist in the database yet
            }
          };
        });
        
        setJobs(formattedJobs);
        console.log("Admin Jobs tab - Processed assigned jobs:", formattedJobs);
      } catch (error) {
        console.error("Error loading assigned jobs:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Load jobs initially
    loadJobs();
    
    // Setup a listener for Supabase realtime updates
    const channel = supabase
      .channel('assigned-jobs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'reporter_jobs' }, 
        () => {
          console.log("Admin Jobs tab - Supabase realtime update received");
          loadJobs();
        }
      )
      .subscribe();
    
    // Setup a listener for manual refreshes
    document.addEventListener('jobsUpdated', () => {
      console.log("Admin Jobs tab - Manual jobs update event received");
      loadJobs();
    });
    
    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('jobsUpdated', loadJobs as EventListener);
    };
  }, [users]);

  return { jobs, setJobs, isLoading };
};
