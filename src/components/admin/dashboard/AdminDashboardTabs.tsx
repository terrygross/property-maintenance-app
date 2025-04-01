
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import AdminTab from "@/components/AdminTab";
import UserManagement from "@/components/UserManagement";
import PropertyManagement from "@/components/PropertyManagement";
import MaintenanceConfig from "@/components/maintenance/MaintenanceConfig";
import Reports from "@/components/maintenance/Reports";
import ReporterJobCards from "@/components/reporter/ReporterJobCards";
import JobsList from "@/components/jobs/JobsList";
import GenericTabContent from "@/components/admin/GenericTabContent";
import MaintenanceJobCards from "@/components/maintenance/jobcards/MaintenanceJobCards";
import ChatInterface from "@/components/chat/ChatInterface";
import ReporterManagement from "@/components/reporter/ReporterManagement";
import BillingManagement from "@/components/billing/BillingManagement";
import ComplianceLists from "@/components/maintenance/compliance/ComplianceLists";
import AdminTechnicianView from "@/components/maintenance/tech/AdminTechnicianView";
import { UserRole } from "@/types/user";
import SystemSettings from "@/components/settings/SystemSettings";

interface AdminDashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  currentUserId: string;
}

const AdminDashboardTabs = ({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  currentUserId 
}: AdminDashboardTabsProps) => {
  return (
    <>
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

      <TabsContent value="tech-view">
        <AdminTab title="Maintenance Technician UI" description="View and interact with the technician interface">
          <AdminTechnicianView />
        </AdminTab>
      </TabsContent>

      <TabsContent value="settings">
        <AdminTab title="System Settings" description="Configure global parameters for your maintenance system">
          <SystemSettings />
        </AdminTab>
      </TabsContent>

      <TabsContent value="logs">
        <GenericTabContent 
          title="System Logs" 
          description="View system events, errors, and user actions" 
          setActiveTab={setActiveTab}
          showBackButton={false}
        />
      </TabsContent>

      <TabsContent value="reporter">
        <AdminTab title="Reported Jobs" description="View and assign reported maintenance issues">
          <ReporterJobCards setActiveTab={setActiveTab} />
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
          setActiveTab={setActiveTab}
          showBackButton={false}
        />
      </TabsContent>

      <TabsContent value="recycle-bin">
        <GenericTabContent 
          title="Recycle Bin" 
          description="View and restore deleted items" 
          setActiveTab={setActiveTab}
          showBackButton={false}
        />
      </TabsContent>
    </>
  );
};

export default AdminDashboardTabs;
