
import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import NewTaskDialog from "./admin/tasks/NewTaskDialog";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { useAppState } from "@/context/AppStateContext";
import { UserRole } from "@/types/user";
import OverviewTabContent from "./admin/OverviewTabContent";
import BackToOverviewButton from "./admin/dashboard/BackToOverviewButton";
import AdminDashboardTabs from "./admin/dashboard/AdminDashboardTabs";
import DashboardHeader from "./admin/dashboard/DashboardHeader";
import { useLocation } from "react-router-dom";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

interface AdminDashboardProps {
  userRole?: UserRole;
}

const AdminDashboard = ({ userRole = "admin" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const { users, properties } = useAppState();
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const { jobCards: unassignedJobs } = useReporterJobs();
  
  // Enhanced logging for debugging
  useEffect(() => {
    console.log("AdminDashboard - High priority jobs:", highPriorityJobs.length);
    console.log("AdminDashboard - Unassigned jobs total:", unassignedJobs?.length || 0);
    
    const highPriorityUnassigned = unassignedJobs?.filter(job => 
      job.priority === "high" || job.highPriority === true
    ) || [];
    
    console.log("AdminDashboard - High priority unassigned jobs:", highPriorityUnassigned.length);
    
    // Additional direct check against database for high priority jobs
    const checkDatabaseForHighPriorityJobs = async () => {
      try {
        const { data, error } = await reporterJobsTable()
          .select('id, high_priority, priority, title')
          .or('high_priority.eq.true,priority.eq.high');
          
        if (error) throw error;
        
        console.log("AdminDashboard - Direct database check for high priority jobs:", data);
        
        // If we found some but our state doesn't have them, refresh
        if (data?.length > 0 && highPriorityJobs.length === 0 && highPriorityUnassigned.length === 0) {
          console.log("AdminDashboard - Triggering refresh for missing high priority jobs");
          document.dispatchEvent(new Event('jobsUpdated'));
          document.dispatchEvent(new CustomEvent('highPriorityJobsExist', { 
            detail: { count: data.length } 
          }));
        }
      } catch (err) {
        console.error("Error checking for high priority jobs directly:", err);
      }
    };
    
    // Initial check
    checkDatabaseForHighPriorityJobs();
    
  }, [highPriorityJobs, unassignedJobs]);
  
  // Force a periodic refresh of the data
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      // Dispatch event to force refresh of job data
      document.dispatchEvent(new CustomEvent('jobsUpdated'));
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  const currentUserId = "4";

  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );
  
  // Handle URL parameters for direct tab navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    const subtabFromUrl = params.get("subtab");
    
    if (tabFromUrl && !isInitialized) {
      setActiveTab(tabFromUrl);
      
      // Store subtab in sessionStorage to be used by the component when it loads
      if (subtabFromUrl) {
        sessionStorage.setItem(`${tabFromUrl}-subtab`, subtabFromUrl);
      }
      
      setIsInitialized(true);
    } else if (!isInitialized) {
      setActiveTab("overview");
      setIsInitialized(true);
    }
  }, [location.search, isInitialized]);

  const handleBackToOverview = () => {
    setActiveTab("overview");
  };

  const handleNewTaskClick = () => {
    setShowNewTaskDialog(true);
  };
  
  const handleAlertClick = () => {
    // Navigate to jobs tab which will show high priority jobs
    setActiveTab("reporter");
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {activeTab === "overview" && (
        <DashboardHeader 
          highPriorityJobs={highPriorityJobs} 
          unassignedJobs={unassignedJobs}
          onAlertClick={handleAlertClick}
          onNewTaskClick={handleNewTaskClick}
        />
      )}
      
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        {activeTab !== "overview" && (
          <BackToOverviewButton activeTab={activeTab} onBackClick={handleBackToOverview} />
        )}

        {activeTab === "overview" && (
          <OverviewTabContent 
            setActiveTab={setActiveTab} 
            unassignedJobs={unassignedJobs}
          />
        )}

        <AdminDashboardTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
          currentUserId={currentUserId}
        />
      </Tabs>
      
      <NewTaskDialog
        open={showNewTaskDialog}
        onOpenChange={setShowNewTaskDialog}
        technicians={technicians}
        properties={properties}
      />
    </div>
  );
};

export default AdminDashboard;
