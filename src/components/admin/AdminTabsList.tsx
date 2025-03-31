
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Settings, Building, ClipboardList, BarChart, 
  MessageCircle, Wallet, CheckSquare, FileText, 
  RotateCcw, Trash, FileSpreadsheet, Wrench, 
  CalendarClock, ScrollText
} from "lucide-react";

const AdminTabsList = () => {
  return (
    <TabsList className="flex flex-wrap mb-4 bg-transparent p-0 h-auto gap-1">
      <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-slate-100">
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Overview
      </TabsTrigger>
      <TabsTrigger value="users" className="rounded-md data-[state=active]:bg-slate-100">
        <Users className="w-4 h-4 mr-2" />
        Users
      </TabsTrigger>
      <TabsTrigger value="properties" className="rounded-md data-[state=active]:bg-slate-100">
        <Building className="w-4 h-4 mr-2" />
        Properties
      </TabsTrigger>
      <TabsTrigger value="maintenance" className="rounded-md data-[state=active]:bg-slate-100">
        <Settings className="w-4 h-4 mr-2" />
        Maintenance
      </TabsTrigger>
      <TabsTrigger value="compliance" className="rounded-md data-[state=active]:bg-slate-100">
        <CheckSquare className="w-4 h-4 mr-2" />
        Compliance
      </TabsTrigger>
      <TabsTrigger value="maintenance-jobcards" className="rounded-md data-[state=active]:bg-slate-100">
        <CalendarClock className="w-4 h-4 mr-2" />
        Job Cards
      </TabsTrigger>
      <TabsTrigger value="tech-view" className="rounded-md data-[state=active]:bg-slate-100">
        <Wrench className="w-4 h-4 mr-2" />
        Tech UI
      </TabsTrigger>
      <TabsTrigger value="reporter" className="rounded-md data-[state=active]:bg-slate-100">
        <ClipboardList className="w-4 h-4 mr-2" />
        Reported Jobs
      </TabsTrigger>
      <TabsTrigger value="reporter-management" className="rounded-md data-[state=active]:bg-slate-100">
        <ScrollText className="w-4 h-4 mr-2" />
        Reporter Mgmt
      </TabsTrigger>
      <TabsTrigger value="jobs" className="rounded-md data-[state=active]:bg-slate-100">
        <ClipboardList className="w-4 h-4 mr-2" />
        Jobs
      </TabsTrigger>
      <TabsTrigger value="reports" className="rounded-md data-[state=active]:bg-slate-100">
        <BarChart className="w-4 h-4 mr-2" />
        Reports
      </TabsTrigger>
      <TabsTrigger value="chat" className="rounded-md data-[state=active]:bg-slate-100">
        <MessageCircle className="w-4 h-4 mr-2" />
        Chat
      </TabsTrigger>
      <TabsTrigger value="billing" className="rounded-md data-[state=active]:bg-slate-100">
        <Wallet className="w-4 h-4 mr-2" />
        Billing
      </TabsTrigger>
      <TabsTrigger value="settings" className="rounded-md data-[state=active]:bg-slate-100">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </TabsTrigger>
      <TabsTrigger value="logs" className="rounded-md data-[state=active]:bg-slate-100">
        <FileText className="w-4 h-4 mr-2" />
        Logs
      </TabsTrigger>
      <TabsTrigger value="backup" className="rounded-md data-[state=active]:bg-slate-100">
        <RotateCcw className="w-4 h-4 mr-2" />
        Backup
      </TabsTrigger>
      <TabsTrigger value="recycle-bin" className="rounded-md data-[state=active]:bg-slate-100">
        <Trash className="w-4 h-4 mr-2" />
        Recycle Bin
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsList;
