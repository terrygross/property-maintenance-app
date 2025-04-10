
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Enable realtime for reporter_jobs table
    await supabase.rpc('supabase_functions.enable_realtime', {
      table_name: 'reporter_jobs',
      schema_name: 'public'
    });
    
    console.log("Realtime enabled for reporter_jobs table");
    return true;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return false;
  }
};
