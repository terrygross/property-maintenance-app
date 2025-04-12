
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Enable PostgreSQL replication for the reporter_jobs table to support realtime
    await supabase.rpc('supabase_realtime', { 
      table: 'reporter_jobs',
      insert: true,
      update: true,
      delete: true,
      source: null // Changed from empty string to null as required by the type definition
    });
    
    // Create a realtime channel with proper configuration
    const channel = supabase.channel('public:reporter_jobs')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'reporter_jobs' 
      }, payload => {
        console.log('Realtime change received!', payload);
        
        // Type checking and safely accessing properties
        if (payload.new) {
          // Explicitly type the payload data to avoid TypeScript errors
          const newData = payload.new as Record<string, any>;
          
          // Dispatch an event to notify components
          document.dispatchEvent(new CustomEvent('jobsUpdated', { 
            detail: payload,
            // Add bubbles property to ensure event propagation
            bubbles: true
          }));
          
          // Check if this is a high priority job
          if (newData.high_priority === true || newData.priority === 'high') {
            console.log('High priority job detected in realtime!', newData);
            // Force refresh of dashboard data
            document.dispatchEvent(new CustomEvent('highPriorityJobAdded', { 
              detail: newData,
              bubbles: true
            }));
          }
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
          detail: { count: highPriorityJobs.length },
          bubbles: true
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
