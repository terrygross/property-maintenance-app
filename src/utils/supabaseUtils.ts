
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
        document.dispatchEvent(new Event('jobsUpdated'));
      })
      .subscribe();
    
    console.log("Realtime channel created and subscribed for reporter_jobs table");
    
    // Verify table connection
    try {
      const { data, error } = await supabase.from('reporter_jobs')
        .select('id')
        .limit(1);
        
      if (error) {
        throw error;
      }
      
      console.log("Successfully connected to reporter_jobs table:", data);
    } catch (innerError) {
      console.error("Error verifying reporter_jobs table connection:", innerError);
    }
    
    return true;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return false;
  }
};
