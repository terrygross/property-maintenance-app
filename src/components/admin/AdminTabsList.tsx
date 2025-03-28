
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminTabsList = () => {
  return (
    <div className="mb-6 overflow-x-auto">
      <TabsList className="flex w-full justify-start">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="reporter">Reporter</TabsTrigger>
        <TabsTrigger value="jobs">Jobs</TabsTrigger>
        <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
      </TabsList>
    </div>
  );
};

export default AdminTabsList;
