
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionTab from "./SubscriptionTab";
import PaymentMethods from "./PaymentMethods";
import BillingHistory from "./BillingHistory";

const BillingManagement = () => {
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [techCount, setTechCount] = useState(0);
  const [stationCount, setStationCount] = useState(0);

  const handleCapacityUpdate = (techs: number, stations: number) => {
    setTechCount(techs);
    setStationCount(stations);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Billing Management</h2>
        <p className="text-muted-foreground">
          Manage your subscription, payment methods, and billing history.
        </p>
      </div>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <SubscriptionTab 
            currentPlan={currentPlan}
            techCount={techCount}
            stationCount={stationCount}
            onCapacityUpdate={handleCapacityUpdate}
          />
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
