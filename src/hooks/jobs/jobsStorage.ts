
/**
 * Utility functions for loading and saving jobs
 */
import { Job } from "./types";
import { supabase } from "@/integrations/supabase/client";

/**
 * Load jobs from Supabase for a given user ID
 */
export const loadJobsFromStorage = async (userId: string): Promise<Job[]> => {
  try {
    // Fetch jobs from Supabase
    const { data: jobs, error } = await supabase
      .from('reporter_jobs')
      .select('*')
      .eq('assigned_to', userId);
    
    if (error) {
      throw error;
    }
    
    if (jobs?.length > 0) {
      console.log("Found jobs for user:", jobs);
      
      // Format jobs with proper structure
      return jobs.map((job) => {
        // Ensure photos have the right structure
        const photos = {
          reporter: job.image_url || undefined,
          before: job.before_photo || undefined,
          after: job.after_photo || undefined
        };
        
        // Log the photo structure for debugging
        console.log(`Job ${job.id} photos:`, photos);
        
        return {
          id: job.id,
          title: job.title || job.description,
          location: job.property || job.location,
          priority: job.priority || "medium",
          dueDate: new Date(job.due_date || job.report_date || Date.now()),
          status: job.status || "assigned",
          assignedTo: job.assigned_to,
          accepted: job.accepted || false,
          comments: job.comments || [],
          photos: photos
        };
      });
    }
  } catch (error) {
    console.error("Error loading jobs from Supabase:", error);
  }
  
  // Return empty array if no jobs found or error
  return [];
};

/**
 * Get mock jobs for demonstration purposes (when no real jobs exist)
 */
export const getMockJobs = (): Job[] => {
  // Return empty array - no more mock jobs
  return [];
};
