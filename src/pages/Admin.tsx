
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminTab from "@/components/AdminTab";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import AdminDashboard from "@/components/AdminDashboard";
import { Toaster } from "sonner";
import ChatDrawer from "@/components/chat/ChatDrawer";
import { useAppState } from "@/context/AppStateContext";
import { enableRealtimeForTables } from "@/utils/supabaseUtils";
import { reporterJobsTable } from "@/integrations/supabase/client";

const Admin = () => {
  const { currentUser } = useAppState();
  const currentUserId = currentUser?.id || "4"; // Default to admin if no current user
  const lastUpdateTime = useRef<number>(0);
  const UPDATE_INTERVAL = 5000; // 5 seconds between updates
  
  // Initialize realtime
  useEffect(() => {
    const setupRealtime = async () => {
      const channel = await enableRealtimeForTables();
      if (channel) {
        console.log("Realtime functionality enabled for tables");
        
        // Force an initial check for high priority jobs
        const checkForHighPriorityJobs = async () => {
          try {
            const { data, error } = await reporterJobsTable()
              .select('id, high_priority, priority')
              .or('high_priority.eq.true,priority.eq.high');
              
            if (error) throw error;
            
            if (data && data.length > 0) {
              console.log("Admin - Initial check found high priority jobs:", data.length);
              // Dispatch event to update UI
              document.dispatchEvent(new CustomEvent('highPriorityJobsExist', { 
                detail: { count: data.length } 
              }));
            }
          } catch (err) {
            console.error("Error in initial high priority jobs check:", err);
          }
        };
        
        checkForHighPriorityJobs();
        
        // Initial data refresh
        document.dispatchEvent(new Event('jobsUpdated'));
      } else {
        console.error("Failed to enable realtime functionality");
      }
    };
    
    setupRealtime();
    
    // Set up periodic refresh but with rate limiting
    const refreshInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastUpdateTime.current > UPDATE_INTERVAL) {
        lastUpdateTime.current = now;
        document.dispatchEvent(new Event('jobsUpdated'));
      }
    }, UPDATE_INTERVAL); // Check every 5 seconds instead of 10
    
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      
      <NavBar />
      
      <main className="flex-1 pb-12">
        <AdminDashboard />
      </main>
      
      <Footer />
      
      <ChatDrawer currentUserId={currentUserId} />
    </div>
  );
};

export default Admin;
