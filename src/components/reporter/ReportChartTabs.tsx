
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportChartTabs = () => {
  return (
    <Tabs defaultValue="requests" className="w-full">
      <TabsList>
        <TabsTrigger value="requests">Request Categories</TabsTrigger>
        <TabsTrigger value="response">Response Time</TabsTrigger>
        <TabsTrigger value="costs">Costs</TabsTrigger>
      </TabsList>
      
      <TabsContent value="requests" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Request Categories Distribution</CardTitle>
            <CardDescription>Breakdown of maintenance requests by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Chart visualization will be implemented here</p>
              <p>(Request Categories Distribution)</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="response" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
            <CardDescription>Trends in maintenance response times</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Chart visualization will be implemented here</p>
              <p>(Response Time Trends)</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="costs" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Costs</CardTitle>
            <CardDescription>Financial analysis of maintenance activities</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Chart visualization will be implemented here</p>
              <p>(Maintenance Costs Analysis)</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ReportChartTabs;
