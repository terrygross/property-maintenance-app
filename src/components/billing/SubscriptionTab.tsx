
import { BadgeDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CurrentPlanOverview from "./CurrentPlanOverview";
import AdditionalCapacityForm from "./AdditionalCapacityForm";
import AdditionalServices from "./AdditionalServices";
import BillingUsageChart from "./BillingUsageChart";
import SubscriptionPlanComparison from "./SubscriptionPlanComparison";

interface SubscriptionTabProps {
  currentPlan: string;
  techCount: number;
  stationCount: number;
  onCapacityUpdate: (techCount: number, stationCount: number) => void;
}

const SubscriptionTab = ({ 
  currentPlan, 
  techCount, 
  stationCount, 
  onCapacityUpdate 
}: SubscriptionTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgeDollarSign className="h-5 w-5 text-blue-600" />
            Current Plan
          </CardTitle>
          <CardDescription>
            Your current subscription details and usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CurrentPlanOverview 
            currentPlan={currentPlan} 
            techCount={techCount} 
            stationCount={stationCount} 
          />
          <AdditionalCapacityForm onCapacityUpdate={onCapacityUpdate} />
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline">Cancel Subscription</Button>
          <Button variant="outline">Change Plan</Button>
        </CardFooter>
      </Card>

      <BillingUsageChart />
      
      <SubscriptionPlanComparison />

      <AdditionalServices />
    </div>
  );
};

export default SubscriptionTab;
