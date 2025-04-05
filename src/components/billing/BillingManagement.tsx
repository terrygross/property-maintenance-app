
import { useState, useEffect } from "react";
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
  const [userRole, setUserRole] = useState<string>("user");

  // Simulate checking user role - in a real app, this would come from auth context
  useEffect(() => {
    // Check if user is admin (in dev environment)
    const checkRole = async () => {
      // In development, we assume admin role for testing
      if (process.env.NODE_ENV === "development") {
        setUserRole("admin");
      } else {
        // In production, this would fetch the role from the backend
        // setUserRole from actual auth state
      }
    };
    
    checkRole();
  }, []);

  const handleCapacityUpdate = (techs: number, stations: number) => {
    setTechCount(techs);
    updateAdditionalStations(stations);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="reporter-subscription">Accounting Subscription</TabsTrigger>
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
          <SubscriptionContent isAdmin={userRole === "admin"} />
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
