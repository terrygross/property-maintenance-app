
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminTabsList = () => {
  return (
    <TabsList className="w-full h-auto flex flex-wrap justify-start gap-2 bg-transparent mb-6">
      <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Overview
      </TabsTrigger>
      <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Users
      </TabsTrigger>
      <TabsTrigger value="properties" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Properties
      </TabsTrigger>
      <TabsTrigger value="maintenance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Maintenance
      </TabsTrigger>
      <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Reports
      </TabsTrigger>
      <TabsTrigger value="maintenance-jobcards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Job Cards
      </TabsTrigger>
      <TabsTrigger value="reporter" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Reporter
      </TabsTrigger>
      <TabsTrigger value="jobs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Jobs
      </TabsTrigger>
      <TabsTrigger value="billing" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Billing
      </TabsTrigger>
      <TabsTrigger value="logs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Logs
      </TabsTrigger>
      <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Settings
      </TabsTrigger>
      <TabsTrigger value="backup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
        Backup
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsList;
