
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReporterStationManagement from "./ReporterStationManagement";
import StatsOverview from "./stats/StatsOverview";
import ReporterInterfaceSimulation from "./simulation/ReporterInterfaceSimulation";
import { useAppState } from "@/context/AppStateContext";

const ReporterManagement = () => {
  const { additionalStations } = useAppState();
  
  return (
    <div className="space-y-6">
      <StatsOverview />

      <Tabs defaultValue="stations" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="stations">Reporter Stations</TabsTrigger>
          <TabsTrigger value="interface">Reporter Interface</TabsTrigger>
        </TabsList>
        <TabsContent value="stations" className="space-y-4">
          <ReporterStationManagement />
        </TabsContent>
        <TabsContent value="interface">
          <ReporterInterfaceSimulation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReporterManagement;
