
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Building, 
  CreditCard, 
  Database, 
  FileClock, 
  Home, 
  MessageCircle, 
  Settings, 
  Shield, 
  Ticket, 
  Users, 
  Wrench 
} from "lucide-react";

const AdminTabsList = () => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 mb-6">
      <TabsTrigger value="overview" className="flex items-center">
        <Home className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Overview</span>
      </TabsTrigger>
      
      <TabsTrigger value="users" className="flex items-center">
        <Users className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Users</span>
      </TabsTrigger>
      
      <TabsTrigger value="properties" className="flex items-center">
        <Building className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Properties</span>
      </TabsTrigger>
      
      <TabsTrigger value="maintenance" className="flex items-center">
        <Wrench className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Settings</span>
      </TabsTrigger>
      
      <TabsTrigger value="reports" className="flex items-center">
        <BarChart3 className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Reports</span>
      </TabsTrigger>
      
      <TabsTrigger value="maintenance-jobcards" className="flex items-center">
        <FileClock className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Job Cards</span>
      </TabsTrigger>
      
      <TabsTrigger value="chat" className="flex items-center">
        <MessageCircle className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Chat</span>
      </TabsTrigger>
      
      <TabsTrigger value="billing" className="flex items-center">
        <CreditCard className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Billing</span>
      </TabsTrigger>
      
      <TabsTrigger value="settings" className="flex items-center">
        <Settings className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">System</span>
      </TabsTrigger>
      
      <TabsTrigger value="logs" className="flex items-center">
        <Shield className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Logs</span>
      </TabsTrigger>
      
      <TabsTrigger value="reporter" className="flex items-center">
        <Ticket className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Reporter</span>
      </TabsTrigger>
      
      <TabsTrigger value="backup" className="flex items-center">
        <Database className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Backup</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsList;
