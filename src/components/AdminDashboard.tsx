
import { useState, useEffect } from "react";
import { Tabs } from "@/components/ui/tabs";
import NewTaskDialog from "./admin/tasks/NewTaskDialog";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { useAppState } from "@/context/AppStateContext";
import { UserRole } from "@/types/user";
import OverviewTabContent from "./admin/OverviewTabContent";
import BackToOverviewButton from "./admin/dashboard/BackToOverviewButton";
import AdminDashboardTabs from "./admin/dashboard/AdminDashboardTabs";

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

  useEffect(() => {
    if (!isInitialized) {
      setActiveTab("overview");
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const handleBackToOverview = () => {
    setActiveTab("overview");
  };

  const handleNewTaskClick = () => {
    setShowNewTaskDialog(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <BackToOverviewButton activeTab={activeTab} onBackClick={handleBackToOverview} />

        {activeTab === "overview" && (
          <OverviewTabContent setActiveTab={setActiveTab} />
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
