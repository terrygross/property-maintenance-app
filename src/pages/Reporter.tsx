
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const Reporter = () => {
  const [reportType, setReportType] = useState("maintenance");
  const [dateRange, setDateRange] = useState("30days");
  const [property, setProperty] = useState("all");

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporter</h1>
          <p className="text-muted-foreground">Generate and view maintenance reports</p>
        </div>
        <Button asChild>
          <Link to="/admin">Back to Admin</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Customize your report view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance Summary</SelectItem>
                    <SelectItem value="response">Response Time</SelectItem>
                    <SelectItem value="cost">Cost Analysis</SelectItem>
                    <SelectItem value="satisfaction">Tenant Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="ytd">Year to Date</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Property</label>
                <Select value={property} onValueChange={setProperty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="prop1">Property A</SelectItem>
                    <SelectItem value="prop2">Property B</SelectItem>
                    <SelectItem value="prop3">Property C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="mt-4">Generate Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Request Summary</CardTitle>
            <CardDescription>Overview of maintenance requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 font-medium">Total Requests</p>
                <p className="text-3xl font-bold">157</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 font-medium">Completed</p>
                <p className="text-3xl font-bold">108</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-700 font-medium">In Progress</p>
                <p className="text-3xl font-bold">39</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700 font-medium">Overdue</p>
                <p className="text-3xl font-bold">10</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

export default Reporter;
