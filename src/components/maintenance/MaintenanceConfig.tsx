
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaintenanceCategories from "./MaintenanceCategories";
import ServiceProviders from "./ServiceProviders";
import WorkflowRules from "./workflow-rules";
import SLASettings from "./SLASettings";

const MaintenanceConfig = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="categories" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="providers">Service Providers</TabsTrigger>
          <TabsTrigger value="sla">SLA Settings</TabsTrigger>
          <TabsTrigger value="workflow">Workflow Rules</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <MaintenanceCategories />
        </TabsContent>
        <TabsContent value="providers">
          <ServiceProviders />
        </TabsContent>
        <TabsContent value="sla">
          <SLASettings />
        </TabsContent>
        <TabsContent value="workflow">
          <WorkflowRules />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceConfig;
