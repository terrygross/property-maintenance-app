
import { CreditCard, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          Payment Methods
        </CardTitle>
        <CardDescription>
          Manage your payment information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded border border-gray-200">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">•••• •••• •••• 4242</h4>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Default</Badge>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
