
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionTab from "./SubscriptionTab";
import PaymentMethods from "./PaymentMethods";
import BillingHistory from "./BillingHistory";
import { useAppState } from "@/context/AppStateContext";
import SubscriptionContent from "../reporter/subscription/SubscriptionContent";

const BillingManagement = () => {
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const { additionalStations, updateAdditionalStations } = useAppState();
  const [techCount, setTechCount] = useState(0);

  const handleCapacityUpdate = (techs: number, stations: number) => {
    setTechCount(techs);
    updateAdditionalStations(stations);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="reporter-subscription">Reporter Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <SubscriptionTab 
            currentPlan={currentPlan}
            techCount={techCount}
            stationCount={additionalStations}
            onCapacityUpdate={handleCapacityUpdate}
          />
        </TabsContent>

        <TabsContent value="reporter-subscription">
          <SubscriptionContent />
        </TabsContent>

        <TabsContent value="payment-methods">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="billing-history">
          <BillingHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
