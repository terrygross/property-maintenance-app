import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlanFeature {
  name: string;
  basic: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

const SubscriptionPlanComparison = () => {
  const plans = [
    {
      name: "Basic",
      price: "£1,400",
      period: "per year",
      admins: 1,
      technicians: 4,
      stations: 2,
      popular: false,
    },
    {
      name: "Professional",
      price: "£2,900",
      period: "per year",
      admins: 2,
      technicians: 6,
      stations: 3,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "£3,900",
      period: "per year",
      admins: 4,
      technicians: 12,
      stations: 6,
      popular: false,
    },
  ];

  const features: PlanFeature[] = [
    { name: "Maintenance Request Management", basic: true, professional: true, enterprise: true },
    { name: "Task Assignment", basic: true, professional: true, enterprise: true },
    { name: "Basic Reporting", basic: true, professional: true, enterprise: true },
    { name: "Email Notifications", basic: true, professional: true, enterprise: true },
    { name: "Mobile Access", basic: true, professional: true, enterprise: true },
    { name: "API Access", basic: false, professional: true, enterprise: true },
    { name: "Advanced Analytics", basic: false, professional: true, enterprise: true },
    { name: "Custom Workflows", basic: false, professional: true, enterprise: true },
    { name: "Priority Support", basic: "Email only", professional: "Email & Phone", enterprise: "24/7 Dedicated" },
    { name: "Data Retention", basic: "1 year", professional: "3 years", enterprise: "Unlimited" },
    { name: "Custom Integrations", basic: false, professional: false, enterprise: true },
    { name: "SLA Guarantees", basic: false, professional: false, enterprise: true },
    { name: "Maintenance Manager Roles", basic: "Available as add-on", professional: "Available as add-on", enterprise: "Available as add-on" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Subscription Plan Comparison</CardTitle>
        <CardDescription>
          Compare our different plans to find the one that best fits your needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-1"></div>
          {plans.map((plan) => (
            <div key={plan.name} className={`text-center p-4 rounded-lg ${plan.popular ? 'bg-blue-50 border border-blue-200' : ''}`}>
              {plan.popular && <Badge className="mb-2 bg-blue-600">Most Popular</Badge>}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="text-2xl font-bold my-1">{plan.price}</div>
              <div className="text-sm text-gray-500">{plan.period}</div>
            </div>
          ))}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Capacity</TableHead>
              {plans.map((plan) => (
                <TableHead key={plan.name} className="text-center">
                  {plan.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Admin Users</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className="text-center">{plan.admins}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Maintenance Technicians</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className="text-center">{plan.technicians}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Reporting Stations</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className="text-center">{plan.stations}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Maintenance Managers</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name} className="text-center text-blue-600">Optional add-on</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Feature Comparison</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                {plans.map((plan) => (
                  <TableHead key={plan.name} className="text-center">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof feature.basic === 'boolean' ? (
                      feature.basic ? <Check className="mx-auto text-green-500" size={18} /> : <X className="mx-auto text-gray-400" size={18} />
                    ) : (
                      feature.basic
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.professional === 'boolean' ? (
                      feature.professional ? <Check className="mx-auto text-green-500" size={18} /> : <X className="mx-auto text-gray-400" size={18} />
                    ) : (
                      feature.professional
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? <Check className="mx-auto text-green-500" size={18} /> : <X className="mx-auto text-gray-400" size={18} />
                    ) : (
                      feature.enterprise
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="col-span-1"></div>
          {plans.map((plan) => (
            <div key={plan.name} className="text-center">
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-center font-medium">Maintenance Manager Role Available as Add-on: £30/month per manager</p>
          <p className="text-center text-sm text-gray-600 mt-1">Add Maintenance Managers to any plan to improve workflow and team supervision</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlanComparison;
