
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./tabs/GeneralSettings";
import UserAccessSettings from "./tabs/UserAccessSettings";
import MaintenanceSettings from "./tabs/MaintenanceSettings";
import IntegrationSettings from "./tabs/IntegrationSettings";
import NotificationSettings from "./tabs/NotificationSettings";
import ThemeSettings from "./tabs/ThemeSettings";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="general" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-muted w-full h-auto flex flex-wrap gap-2 p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="user-access">User Access</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="user-access">
          <UserAccessSettings />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceSettings />
        </TabsContent>

        <TabsContent value="integration">
          <IntegrationSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="theme">
          <ThemeSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
