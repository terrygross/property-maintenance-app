
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserRole, hasAdminAccess } from "@/types/user";
import Reports from "@/components/maintenance/Reports";
import ExpenseReports from "@/components/reporter/expenses/ExpenseReports";
import ExpensesContent from "@/components/reporter/expenses/ExpensesContent";
import ReportChartTabs from "@/components/reporter/ReportChartTabs";
import { useAppState } from "@/context/AppStateContext";
import { LockIcon, Info, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AdminReportsContentProps {
  userRole?: UserRole;
}

const AdminReportsContent: React.FC<AdminReportsContentProps> = ({ userRole = "admin" }) => {
  const [activeReportTab, setActiveReportTab] = useState("general");
  const { additionalStations } = useAppState();
  const navigate = useNavigate();
  
  // Check if user has access to expense reporting
  // Use the hasAdminAccess helper function instead of directly comparing with "admin"
  const hasExpenseAccess = hasAdminAccess(userRole) || additionalStations >= 2;
  
  const handleSubscribeClick = () => {
    // Navigate to the billing page with accounting subscription tab active
    navigate("/admin?tab=billing&subtab=reporter-subscription");
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">View detailed reports and analytics for your properties</p>
        </div>
      </div>
      
      <Tabs value={activeReportTab} onValueChange={setActiveReportTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General Reports</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Reports</TabsTrigger>
          <TabsTrigger value="expenses" disabled={!hasExpenseAccess}>
            <div className="flex items-center gap-2">
              Log Expenses
              {!hasExpenseAccess && !hasAdminAccess(userRole) && <LockIcon className="h-3 w-3" />}
            </div>
          </TabsTrigger>
          <TabsTrigger value="expense-reports" disabled={!hasExpenseAccess}>
            <div className="flex items-center gap-2">
              Expense Reports
              {!hasExpenseAccess && !hasAdminAccess(userRole) && <LockIcon className="h-3 w-3" />}
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Property Performance</CardTitle>
              <CardDescription>
                Overview of property performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportChartTabs />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Reports />
        </TabsContent>
        
        <TabsContent value="expenses">
          {hasExpenseAccess ? (
            <ExpensesContent />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Alert variant="default" className="bg-yellow-50 border-yellow-200">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Expense Tracking Add-on Required</AlertTitle>
                  <AlertDescription>
                    The Expense Tracking & Entry feature requires an additional subscription.
                    Please visit the Accounting Subscription page to enable this feature.
                  </AlertDescription>
                </Alert>
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleSubscribeClick} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Subscribe to Expense Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="expense-reports">
          {hasExpenseAccess ? (
            <ExpenseReports />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Alert variant="default" className="bg-yellow-50 border-yellow-200">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Expense Tracking Add-on Required</AlertTitle>
                  <AlertDescription>
                    The Expense Tracking & Reporting feature requires an additional subscription.
                    Please visit the Accounting Subscription page under Billing to enable this feature.
                  </AlertDescription>
                </Alert>
                <div className="mt-6 flex justify-center">
                  <Button onClick={handleSubscribeClick} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Subscribe to Expense Tracking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReportsContent;
