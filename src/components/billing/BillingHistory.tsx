
import { BadgeDollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BillingHistory = () => {
  const invoices = [
    { date: "May 15, 2023", amount: "£2,900.00", status: "Paid" },
    { date: "Apr 15, 2023", amount: "£2,900.00", status: "Paid" },
    { date: "Mar 15, 2023", amount: "£2,900.00", status: "Paid" }
  ];

  return (
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
          {invoices.map((invoice, index) => (
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
  );
};

export default BillingHistory;
