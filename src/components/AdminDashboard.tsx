
import { useState, useEffect } from "react";
import { UserRole } from "@/types/user";
import { useAppState } from "@/context/AppStateContext";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import AdminTabsContent from "./admin/tabs/AdminTabsContent";
import BackToOverviewButton from "./admin/navigation/BackToOverviewButton";
import TaskDialogManager from "./admin/tasks/TaskDialogManager";

interface AdminDashboardProps {
  userRole?: UserRole;
}

const AdminDashboard = ({ userRole = "admin" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const { users, properties } = useAppState();
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const currentUserId = "4";

  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  // Ensure the dashboard initializes correctly
  useEffect(() => {
    if (!isInitialized) {
      // Force the Overview tab to be the active one on initial load
      setActiveTab("overview");
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleBackToOverview = () => {
    setActiveTab("overview");
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <BackToOverviewButton 
        activeTab={activeTab} 
        onBackClick={handleBackToOverview} 
      />

      <AdminTabsContent 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        currentUserId={currentUserId}
      />
      
      <TaskDialogManager
        showNewTaskDialog={showNewTaskDialog}
        setShowNewTaskDialog={setShowNewTaskDialog}
        technicians={technicians}
        properties={properties}
      />
    </div>
  );
};

export default AdminDashboard;
