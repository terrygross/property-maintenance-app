
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, BadgeDollarSign, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const BillingManagement = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("Professional");
  const [techCount, setTechCount] = useState(0);
  const [stationCount, setStationCount] = useState(0);

  const addCapacityForm = useForm({
    defaultValues: {
      additionalTechs: 0,
      additionalStations: 0,
    },
  });

  const onAddCapacity = (data: { additionalTechs: number; additionalStations: number }) => {
    setTechCount(data.additionalTechs);
    setStationCount(data.additionalStations);
    
    // Calculate total additional cost
    const additionalCost = (data.additionalTechs + data.additionalStations) * 20;
    
    toast({
      title: "Capacity Updated",
      description: `Your request for additional capacity has been received. Additional monthly cost: £${additionalCost}.`,
    });

    // In a real app, this would make an API call to update the subscription
    console.log("Additional capacity requested:", data);
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

        <TabsContent value="subscription" className="space-y-4">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="text-sm font-medium text-gray-500">Current Plan</div>
                  <div className="text-2xl font-bold text-blue-700">{currentPlan}</div>
                  <div className="text-sm text-gray-500 mt-1">£2,900/year</div>
                </div>
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-500">Maintenance Technicians</div>
                  <div className="text-2xl font-bold">6 <span className="text-green-600 text-sm font-normal">+{techCount}</span></div>
                  <div className="text-sm text-gray-500 mt-1">Base plan includes 6 techs</div>
                </div>
                <div className="p-4 rounded-lg border border-gray-200">
                  <div className="text-sm font-medium text-gray-500">Reporting Stations</div>
                  <div className="text-2xl font-bold">3 <span className="text-green-600 text-sm font-normal">+{stationCount}</span></div>
                  <div className="text-sm text-gray-500 mt-1">Base plan includes 3 stations</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-medium">Billing Cycle</h3>
                    <p className="text-sm text-gray-500">Your next payment is due on June 15, 2023</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>

              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium">Need additional capacity?</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      {isOpen ? "Close" : "Add Capacity"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-4">
                  <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
                    <div className="text-sm text-blue-800">
                      <span className="font-semibold">Pricing:</span> Extra Maintenance Technician: £20/month • Extra Reporting Station: £20/month
                    </div>
                  </div>
                  
                  <Form {...addCapacityForm}>
                    <form onSubmit={addCapacityForm.handleSubmit(onAddCapacity)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addCapacityForm.control}
                          name="additionalTechs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Technicians</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="10" 
                                  placeholder="0" 
                                  {...field} 
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormDescription>
                                £20 per additional technician per month
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addCapacityForm.control}
                          name="additionalStations"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Reporting Stations</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="10" 
                                  placeholder="0" 
                                  {...field} 
                                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormDescription>
                                £20 per additional station per month
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Capacity
                      </Button>
                    </form>
                  </Form>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">Cancel Subscription</Button>
              <Button variant="outline">Change Plan</Button>
            </CardFooter>
          </Card>

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
        </TabsContent>

        <TabsContent value="payment-methods">
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
        </TabsContent>

        <TabsContent value="billing-history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeDollarSign className="h-5 w-5 text-blue-600" />
                Billing History
              </CardTitle>
              <CardDescription>
                View and download your previous invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "May 15, 2023", amount: "£2,900.00", status: "Paid" },
                  { date: "Apr 15, 2023", amount: "£2,900.00", status: "Paid" },
                  { date: "Mar 15, 2023", amount: "£2,900.00", status: "Paid" }
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-muted-foreground">Annual Subscription - Professional Plan</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-blue-600 font-medium">{invoice.amount}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">{invoice.status}</Badge>
                      <Button variant="ghost" size="sm">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManagement;
