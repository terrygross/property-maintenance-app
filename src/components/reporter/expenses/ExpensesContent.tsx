
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseEntryForm from "./ExpenseEntryForm";
import ExpenseReports from "./ExpenseReports";
import ExpenseHistory from "./ExpenseHistory";

const ExpensesContent = () => {
  const [activeTab, setActiveTab] = useState("entry");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses & Accounting</CardTitle>
        <CardDescription>
          Track expenses, manage costs, and generate financial reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="entry">Log Expense</TabsTrigger>
            <TabsTrigger value="history">Expense History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="entry" className="space-y-4">
            <ExpenseEntryForm />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <ExpenseHistory />
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <ExpenseReports />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpensesContent;
