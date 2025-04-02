
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, BarChart4, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionContent = () => {
  const { additionalStations, updateAdditionalStations } = useAppState();
  const { toast } = useToast();
  
  const hasExpensesModule = additionalStations >= 2;
  
  const handlePurchaseExpensesModule = () => {
    if (additionalStations < 2) {
      // This would typically open a payment modal in a real app
      toast({
        title: "Upgrade Required",
        description: "Upgrading your plan to include expense tracking...",
      });
      
      // Simulate successful purchase
      setTimeout(() => {
        updateAdditionalStations(2);
        toast({
          title: "Upgrade Successful!",
          description: "Expense tracking has been added to your subscription.",
        });
      }, 1500);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounting Subscription Settings</CardTitle>
        <CardDescription>
          Manage your accounting subscription plan and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Current Plan: Basic</p>
            <p className="text-sm text-muted-foreground">
              Your plan includes 2 base accounting stations + ({additionalStations}) additional purchased station{additionalStations !== 1 ? 's' : ''}.
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Next billing date: June 15, 2023</p>
            <p className="text-sm text-muted-foreground">
              Contact support to change your base plan or upgrade for more features.
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <CardTitle className="text-lg mb-4">Add-on Features</CardTitle>
          
          <div className="grid gap-4">
            <Card className={hasExpensesModule ? "border-green-300 bg-green-50" : ""}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${hasExpensesModule ? 'bg-green-100' : 'bg-blue-100'}`}>
                      {hasExpensesModule ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Wallet className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">Expense Tracking & Reporting</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Track expenses, manage costs, and generate downloadable financial reports
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-center text-muted-foreground">
                          <Check className="h-3.5 w-3.5 mr-2 text-green-600" />
                          Track materials, tools, fuel, and other expenses
                        </li>
                        <li className="flex items-center text-muted-foreground">
                          <Check className="h-3.5 w-3.5 mr-2 text-green-600" />
                          Generate expense reports with charts and tables
                        </li>
                        <li className="flex items-center text-muted-foreground">
                          <Check className="h-3.5 w-3.5 mr-2 text-green-600" />
                          Export reports to Excel or download as PDF
                        </li>
                        <li className="flex items-center text-muted-foreground">
                          <Check className="h-3.5 w-3.5 mr-2 text-green-600" />
                          Email reports directly to stakeholders
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 border-t">
                {hasExpensesModule ? (
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Active
                  </div>
                ) : (
                  <Button onClick={handlePurchaseExpensesModule} className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Purchase for $20/month
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionContent;
