
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your maintenance system</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>

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

        <TabsContent value="reports">
          <AdminTab title="Reports" description="Access detailed maintenance performance reports">
            <Reports />
          </AdminTab>
        </TabsContent>

        <TabsContent value="maintenance-jobcards">
          <AdminTab title="Maintenance Job Cards" description="View job cards, manage leave calendar, and schedule call-out rota">
            <MaintenanceJobCards />
          </AdminTab>
        </TabsContent>

        <TabsContent value="billing">
          <GenericTabContent 
            title="Billing Management" 
            description="View and manage subscription plans and payment methods" 
          />
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
          <AdminTab title="Reporter" description="View and assign reported maintenance issues">
            <ReporterJobCards />
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
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
