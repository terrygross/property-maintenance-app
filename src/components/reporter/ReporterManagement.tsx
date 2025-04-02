
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReporterStationManagement from "./ReporterStationManagement";
import StatsOverview from "./stats/StatsOverview";
import SubscriptionContent from "./subscription/SubscriptionContent";
import ReporterInterfaceSimulation from "./simulation/ReporterInterfaceSimulation";
import ExpensesContent from "./expenses/ExpensesContent";
import { useAppState } from "@/context/AppStateContext";

const ReporterManagement = () => {
  const { additionalStations } = useAppState();
  const hasExpensesModule = additionalStations >= 2; // Premium feature for users with at least 2 additional stations
  
  return (
    <div className="space-y-6">
      <StatsOverview />

      <Tabs defaultValue="stations" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="stations">Reporter Stations</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="interface">Reporter Interface</TabsTrigger>
          {hasExpensesModule && (
            <TabsTrigger value="expenses">Expenses & Accounting</TabsTrigger>
          )}
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
        {hasExpensesModule && (
          <TabsContent value="expenses">
            <ExpensesContent />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ReporterManagement;
