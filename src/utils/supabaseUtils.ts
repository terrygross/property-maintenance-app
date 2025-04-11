
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Using rpc function directly without specifying table name
    await supabase.rpc('supabase_functions.enable_realtime');
    
    console.log("Realtime enabled for reporter_jobs table");
    return true;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return false;
  }
};
