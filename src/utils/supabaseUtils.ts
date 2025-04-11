
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Create a realtime channel with proper configuration
    const channel = supabase.channel('public:reporter_jobs')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'reporter_jobs' 
      }, payload => {
        console.log('Change received!', payload);
        // Dispatch an event to notify components
        document.dispatchEvent(new CustomEvent('jobsUpdated', { detail: payload }));
        
        // Also check if this is a high priority job
        if (
          payload.new && 
          (payload.new.high_priority === true || payload.new.priority === 'high')
        ) {
          console.log('High priority job detected in realtime!', payload.new);
          // Force refresh of dashboard data
          document.dispatchEvent(new CustomEvent('highPriorityJobAdded', { detail: payload.new }));
        }
      })
      .subscribe((status) => {
        console.log("Supabase realtime subscription status:", status);
      });
    
    console.log("Realtime channel created and subscribed for reporter_jobs table");
    
    // Verify table connection
    try {
      const { data, error } = await supabase.from('reporter_jobs')
        .select('id, high_priority, priority')
        .limit(5);
        
      if (error) {
        throw error;
      }
      
      console.log("Successfully connected to reporter_jobs table:", data);
      
      // Check for any existing high priority jobs
      const highPriorityJobs = data?.filter(job => 
        job.high_priority === true || job.priority === 'high'
      );
      
      console.log(`Found ${highPriorityJobs?.length || 0} existing high priority jobs`);
      
      if (highPriorityJobs?.length > 0) {
        // Force refresh of high priority job data
        document.dispatchEvent(new CustomEvent('highPriorityJobsExist', { 
          detail: { count: highPriorityJobs.length } 
        }));
      }
    } catch (innerError) {
      console.error("Error verifying reporter_jobs table connection:", innerError);
    }
    
    return channel;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return null;
  }
};
