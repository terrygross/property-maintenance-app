
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { ChartBar, ChartPie, Calendar as CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Reporter = () => {
  const [reportType, setReportType] = useState("maintenance");
  const [dateRange, setDateRange] = useState("30days");
  const [property, setProperty] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      toast({
        title: "Report Generated",
        description: `${getReportTypeName(reportType)} report for ${getDateRangeName(dateRange)} has been generated.`,
      });
    }, 1500);
  };

  const getReportTypeName = (type: string) => {
    const types: Record<string, string> = {
      maintenance: "Maintenance Summary",
      response: "Response Time",
      cost: "Cost Analysis",
      satisfaction: "Tenant Satisfaction"
    };
    return types[type] || type;
  };

  const getDateRangeName = (range: string) => {
    const ranges: Record<string, string> = {
      "30days": "Last 30 Days",
      "90days": "Last 90 Days",
      "ytd": "Year to Date",
      "custom": "Custom Range"
    };
    return ranges[range] || range;
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case "maintenance":
        return <FileText className="h-4 w-4 mr-2" />;
      case "response":
        return <CalendarIcon className="h-4 w-4 mr-2" />;
      case "cost":
        return <ChartBar className="h-4 w-4 mr-2" />;
      case "satisfaction":
        return <ChartPie className="h-4 w-4 mr-2" />;
      default:
        return <FileText className="h-4 w-4 mr-2" />;
    }
  };

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
                    <SelectItem value="maintenance" className="flex items-center">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Maintenance Summary
                      </div>
                    </SelectItem>
                    <SelectItem value="response" className="flex items-center">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Response Time
                      </div>
                    </SelectItem>
                    <SelectItem value="cost" className="flex items-center">
                      <div className="flex items-center">
                        <ChartBar className="h-4 w-4 mr-2" />
                        Cost Analysis
                      </div>
                    </SelectItem>
                    <SelectItem value="satisfaction" className="flex items-center">
                      <div className="flex items-center">
                        <ChartPie className="h-4 w-4 mr-2" />
                        Tenant Satisfaction
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select 
                  value={dateRange} 
                  onValueChange={(value) => {
                    setDateRange(value);
                    if (value !== "custom") {
                      setDate(undefined);
                      setEndDate(undefined);
                    }
                  }}
                >
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
            
            {dateRange === "custom" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date !== undefined) ? (d) => d < date : undefined}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
            
            <Button 
              className="mt-4" 
              onClick={handleGenerateReport}
              disabled={isGeneratingReport || (dateRange === "custom" && (!date || !endDate))}
            >
              {isGeneratingReport ? "Generating..." : "Generate Report"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {getReportTypeIcon(reportType)}
              {getReportTypeName(reportType)}
            </CardTitle>
            <CardDescription>
              {getDateRangeName(dateRange)}
              {property !== "all" && ` • ${property === "prop1" ? "Property A" : property === "prop2" ? "Property B" : "Property C"}`}
            </CardDescription>
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
