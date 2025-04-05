import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import PropertyManagement from "@/components/PropertyManagement";
import UserManagement from "@/components/UserManagement";
import JobsSystemActions from "@/components/jobs/JobsSystemActions";
import JobsList from "@/components/jobs/JobsList";
import ReporterJobCards from "@/components/reporter/ReporterJobCards";
import ComplianceDashboard from "@/components/compliance/ComplianceDashboard";
import BillingManagement from "@/components/billing/BillingManagement";
import SystemSettings from "@/components/settings/SystemSettings";
import GenericTabContent from "../GenericTabContent";
import MaintenanceJobCards from "@/components/maintenance/jobcards/MaintenanceJobCards";
import MaintenanceConfig from "@/components/maintenance/MaintenanceConfig";
import ComplianceLists from "@/components/maintenance/compliance/ComplianceLists";
import AdminTechnicianView from "@/components/maintenance/tech/AdminTechnicianView";
import ReporterManagement from "@/components/reporter/ReporterManagement";
import { UserRole } from "@/types/user";
import BackupRestore from "@/pages/BackupRestore";

interface AdminDashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: UserRole;
  currentUserId?: string;
}

const AdminDashboardTabs: React.FC<AdminDashboardTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  userRole = "admin",
  currentUserId = "1"
}) => {
  if (activeTab !== "overview") {
    return (
      <>
        

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        
        <TabsContent value="properties">
          <PropertyManagement />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <MaintenanceConfig />
        </TabsContent>
        
        <TabsContent value="compliance">
          <ComplianceLists />
        </TabsContent>

        <TabsContent value="maintenance-jobcards">
          <MaintenanceJobCards />
        </TabsContent>
        
        <TabsContent value="tech-view">
          <AdminTechnicianView />
        </TabsContent>
        
        <TabsContent value="reporter">
          <ReporterJobCards />
        </TabsContent>
        
        <TabsContent value="reporter-management">
          <ReporterManagement />
        </TabsContent>
        
        <TabsContent value="jobs">
          <div className="space-y-4">
            <JobsSystemActions 
              jobs={[]} 
              setJobs={() => {}} 
            />
            <JobsList />
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <GenericTabContent 
            title="Reports & Analytics"
            description="View detailed reports and analytics for your properties" 
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        
        <TabsContent value="chat">
          <GenericTabContent 
            title="Chat Management"
            description="Configure chat settings and view chat history" 
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingManagement />
        </TabsContent>
        
        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>

        
        <TabsContent value="backup">
          <BackupRestore />
        </TabsContent>
        
        <TabsContent value="logs">
          <GenericTabContent 
            title="System Logs"
            description="View system activity logs" 
            setActiveTab={setActiveTab}
            contentType="logs"
          />
        </TabsContent>
        
        <TabsContent value="recycle-bin">
          <GenericTabContent 
            title="Recycle Bin"
            description="Recover deleted items" 
            setActiveTab={setActiveTab}
            contentType="recycle-bin"
          />
        </TabsContent>
      </>
    );
  }
  
  return null;
};

export default AdminDashboardTabs;
