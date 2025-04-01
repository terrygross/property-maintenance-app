
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReporterStationManagement from "./ReporterStationManagement";
import StatsOverview from "./stats/StatsOverview";
import SubscriptionContent from "./subscription/SubscriptionContent";
import ReporterInterfaceSimulation from "./simulation/ReporterInterfaceSimulation";

const ReporterManagement = () => {
  return (
    <div className="space-y-6">
      <StatsOverview />

      <Tabs defaultValue="stations" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="stations">Reporter Stations</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="interface">Reporter Interface</TabsTrigger>
        </TabsList>
        <TabsContent value="stations" className="space-y-4">
          <ReporterStationManagement />
        </TabsContent>
        <TabsContent value="subscription">
          <SubscriptionContent />
        </TabsContent>
        <TabsContent value="interface">
          <ReporterInterfaceSimulation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReporterManagement;
