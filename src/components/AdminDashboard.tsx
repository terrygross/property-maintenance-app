
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AdminTab from "./AdminTab";
import UserManagement from "./UserManagement";
import PropertyManagement from "./PropertyManagement";
import MaintenanceConfig from "./maintenance/MaintenanceConfig";
import Reports from "./maintenance/Reports";
import ReporterJobCards from "./reporter/ReporterJobCards";
import JobsList from "./jobs/JobsList";
import AdminTabsList from "./admin/AdminTabsList";
import OverviewTabContent from "./admin/OverviewTabContent";
import GenericTabContent from "./admin/GenericTabContent";
import MaintenanceJobCards from "./maintenance/jobcards/MaintenanceJobCards";
import ChatInterface from "./chat/ChatInterface";
import ReporterManagement from "./reporter/ReporterManagement";
import BillingManagement from "./billing/BillingManagement";
import { UserRole } from "@/types/user";
import { useAppState } from "@/context/AppStateContext";
import ComplianceLists from "./maintenance/compliance/ComplianceLists";
import NewTaskDialog from "./admin/tasks/NewTaskDialog";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";

interface AdminDashboardProps {
  userRole?: UserRole;
}

const AdminDashboard = ({ userRole = "admin" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const { users, properties } = useAppState();
  const highPriorityJobs = useHighPriorityJobsMonitor();
  
  const currentUserId = "4";

  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  const handleAlertClick = () => {
    setActiveTab("reporter");
  };

  const handleNewTaskClick = () => {
    setShowNewTaskDialog(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <AdminTabsList />

        <TabsContent value="overview" className="space-y-4">
          <OverviewTabContent setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="users">
          <AdminTab title="User Management" description="Add, edit, and manage system users and their permissions">
            <UserManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="properties">
          <AdminTab title="Property Management" description="Manage your property database">
            <PropertyManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="maintenance">
          <AdminTab title="Maintenance Settings" description="Configure maintenance system parameters">
            <MaintenanceConfig />
          </AdminTab>
        </TabsContent>

        <TabsContent value="compliance">
          <AdminTab title="Compliance Lists" description="Manage property compliance lists and assign them to technicians">
            <ComplianceLists />
          </AdminTab>
        </TabsContent>

        <TabsContent value="reports">
          <AdminTab title="Reports" description="Access detailed maintenance performance reports">
            <Reports />
          </AdminTab>
        </TabsContent>

        <TabsContent value="maintenance-jobcards">
          <AdminTab title="Maintenance Job Cards" description="View job cards, manage leave calendar, and schedule call-out rota">
            <MaintenanceJobCards userRole={userRole} />
          </AdminTab>
        </TabsContent>

        <TabsContent value="chat">
          <AdminTab title="Team Chat" description="Communicate with all staff members in real-time">
            <div className="h-[600px]">
              <ChatInterface currentUserId={currentUserId} />
            </div>
          </AdminTab>
        </TabsContent>

        <TabsContent value="billing">
          <AdminTab title="Billing Management" description="Manage subscription plans, payments, and additional capacity">
            <BillingManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="settings">
          <GenericTabContent 
            title="System Settings" 
            description="Configure global parameters for your maintenance system" 
          />
        </TabsContent>

        <TabsContent value="logs">
          <GenericTabContent 
            title="System Logs" 
            description="View system events, errors, and user actions" 
          />
        </TabsContent>

        <TabsContent value="reporter">
          <AdminTab title="Reported Jobs" description="View and assign reported maintenance issues">
            <ReporterJobCards />
          </AdminTab>
        </TabsContent>
        
        <TabsContent value="reporter-management">
          <AdminTab title="Reporter Management" description="Manage reporter accounts and access based on your subscription">
            <ReporterManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="jobs">
          <AdminTab title="Jobs" description="Manage assigned maintenance jobs">
            <JobsList />
          </AdminTab>
        </TabsContent>

        <TabsContent value="backup">
          <GenericTabContent 
            title="Backup & Restore" 
            description="Backup and restore data from cloud storage" 
          />
        </TabsContent>

        <TabsContent value="recycle-bin">
          <GenericTabContent 
            title="Recycle Bin" 
            description="View and restore deleted items" 
          />
        </TabsContent>
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
