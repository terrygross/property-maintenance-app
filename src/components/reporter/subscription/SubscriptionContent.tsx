
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";

const SubscriptionContent = () => {
  const { additionalStations } = useAppState();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Settings</CardTitle>
        <CardDescription>
          Manage your reporter subscription plan and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">Current Plan: Basic</p>
          <p className="text-sm text-muted-foreground">
            Your plan includes 2 base reporter stations + {additionalStations} additional purchased station{additionalStations !== 1 ? 's' : ''}.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Next billing date: June 15, 2023</p>
          <p className="text-sm text-muted-foreground">
            Contact support to upgrade your plan if you need more reporter stations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionContent;
