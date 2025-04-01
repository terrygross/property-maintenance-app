
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveCalendar from "@/components/maintenance/jobcards/LeaveCalendar";
import CallOutSchedule from "@/components/maintenance/jobcards/CallOutSchedule";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { hasAdminAccess } from "@/types/user";

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
  const { leaveRequests, handleLeaveAction } = useLeaveRequests();
  const isAdmin = hasAdminAccess(userRole);

  return (
    <>
      <TabsContent value="users">
        <AdminTab title="Staff Management" description="Manage users, leave calendar, and call-out schedules">
          <Tabs defaultValue="user-management" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="user-management">User Management</TabsTrigger>
              <TabsTrigger value="leave-calendar">Leave Calendar</TabsTrigger>
              <TabsTrigger value="callout-schedule">Call-Out Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user-management">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="leave-calendar">
              <div className="card border rounded-lg p-6">
                <LeaveCalendar 
                  leaveRequests={leaveRequests} 
                  onLeaveAction={handleLeaveAction} 
                  isAdmin={isAdmin} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="callout-schedule">
              <div className="card border rounded-lg p-6">
                <CallOutSchedule />
              </div>
            </TabsContent>
          </Tabs>
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
        <AdminTab title="Maintenance Job Cards" description="View job cards, manage, and schedule">
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
