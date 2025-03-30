
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaintenanceCategories from "./MaintenanceCategories";
import SLASettings from "./SLASettings";
import Contractors from "./ServiceProviders";
import WorkflowRules from "./workflow-rules";

const MaintenanceConfig = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="contractors" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="contractors">Contractors</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="sla">SLA Settings</TabsTrigger>
          <TabsTrigger value="workflow">Workflow Rules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contractors">
          <Contractors />
        </TabsContent>
        
        <TabsContent value="categories">
          <MaintenanceCategories />
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
