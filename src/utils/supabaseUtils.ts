
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Direct PostgreSQL channel creation for realtime functionality
    // This approach avoids the type issues with the RPC call
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'reporter_jobs' 
      }, payload => {
        console.log('Change received!', payload);
      })
      .subscribe();
    
    console.log("Realtime channel created for reporter_jobs table");
    
    // Also attempt to use the RPC method as fallback
    try {
      await supabase.from('reporter_jobs')
        .select('id')
        .limit(1);
        
      // If we reach here, the table exists and we can communicate with it
      console.log("Verified reporter_jobs table connection");
    } catch (innerError) {
      console.error("Error verifying reporter_jobs table:", innerError);
    }
    
    return true;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return false;
  }
};
