
import { supabase } from "@/integrations/supabase/client";

/**
 * Enable Realtime functionality for Supabase tables
 */
export const enableRealtimeForTables = async () => {
  try {
    // Enable realtime for reporter_jobs table using Supabase REST API
    // Using any type to bypass the type checking issue while still enabling the functionality
    await supabase.rpc('enable_realtime', {
      table: 'reporter_jobs'
    } as any);
    
    console.log("Realtime enabled for reporter_jobs table");
    return true;
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return false;
  }
};
