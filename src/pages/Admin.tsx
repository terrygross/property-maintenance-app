
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminTab from "@/components/AdminTab";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import AdminDashboard from "@/components/AdminDashboard";
import { Toaster } from "sonner";
import ChatDrawer from "@/components/chat/ChatDrawer";
import { useAppState } from "@/context/AppStateContext";
import { enableRealtimeForTables } from "@/utils/supabaseUtils";

const Admin = () => {
  const { currentUser } = useAppState();
  const currentUserId = currentUser?.id || "4"; // Default to admin if no current user
  
  // Initialize realtime
  useEffect(() => {
    const setupRealtime = async () => {
      const result = await enableRealtimeForTables();
      if (result) {
        console.log("Realtime functionality enabled for tables");
        // Force an initial refresh of jobs data
        document.dispatchEvent(new Event('jobsUpdated'));
      } else {
        console.error("Failed to enable realtime functionality");
      }
    };
    
    setupRealtime();
    
    // Set up periodic refresh to ensure we get all updates
    const refreshInterval = setInterval(() => {
      document.dispatchEvent(new Event('jobsUpdated'));
    }, 10000); // Check every 10 seconds
    
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
