
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdditionalServices = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-600" />
          Additional Services
        </CardTitle>
        <CardDescription>
          Optional add-ons and services for your maintenance system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Premium Support</h4>
              <p className="text-sm text-muted-foreground">24/7 priority support with 2-hour response time</p>
            </div>
            <Button variant="outline">Add - £99/month</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Advanced Analytics</h4>
              <p className="text-sm text-muted-foreground">Detailed performance metrics and custom reporting</p>
            </div>
            <Button variant="outline">Add - £49/month</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="font-medium">Custom Integration</h4>
              <p className="text-sm text-muted-foreground">Connect with your existing property management software</p>
            </div>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalServices;
