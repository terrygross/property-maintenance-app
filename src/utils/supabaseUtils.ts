
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Enable realtime for all tables using Supabase REST API
    await supabase.rpc('enable_realtime', {
      table: 'reporter_jobs'
    });
    
    console.log("Realtime enabled for reporter_jobs table");
    return true;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return false;
  }
};
