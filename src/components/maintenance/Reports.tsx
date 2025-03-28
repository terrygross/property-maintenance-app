import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { DownloadIcon, PieChartIcon, BarChartIcon, CalendarIcon, UploadIcon, FileSpreadsheetIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";

const categoryData = [
  { name: "Plumbing", value: 32, fill: "#0ea5e9" },
  { name: "Electrical", value: 25, fill: "#f59e0b" },
  { name: "HVAC", value: 18, fill: "#10b981" },
  { name: "Appliances", value: 15, fill: "#6366f1" },
  { name: "Structural", value: 10, fill: "#ec4899" }
];

const responseTimeData = [
  { category: "Plumbing", avgTime: 4.2 },
  { category: "Electrical", avgTime: 3.8 },
  { name: "HVAC", avgTime: 6.5 },
  { category: "Appliances", avgTime: 5.1 },
  { category: "Structural", avgTime: 8.2 }
];

const costData = [
  { month: 'Jan', cost: 4200 },
  { month: 'Feb', cost: 3800 },
  { month: 'Mar', cost: 5600 },
  { month: 'Apr', cost: 4900 },
  { month: 'May', cost: 6200 },
  { month: 'Jun', cost: 5100 }
];

const satisfactionData = [
  { name: "Very Satisfied", value: 45, fill: "#10b981" },
  { name: "Satisfied", value: 30, fill: "#0ea5e9" },
  { name: "Neutral", value: 15, fill: "#f59e0b" },
  { name: "Dissatisfied", value: 7, fill: "#ec4899" },
  { name: "Very Dissatisfied", value: 3, fill: "#ef4444" }
];

const chartConfig = {
  maintenance: {
    theme: {
      light: "#0ea5e9",
      dark: "#0ea5e9"
    }
  },
  response: {
    theme: {
      light: "#f59e0b",
      dark: "#f59e0b"
    }
  },
  cost: {
    theme: {
      light: "#10b981",
      dark: "#10b981"
    }
  },
  satisfaction: {
    theme: {
      light: "#6366f1",
      dark: "#6366f1"
    }
  }
};

const Reports = () => {
  const [reportType, setReportType] = useState("maintenance");
  const [dateRange, setDateRange] = useState("30days");
  const [property, setProperty] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowDataTable(true);
      toast({
        title: "Report Generated",
        description: `${getReportTypeName(reportType)} report has been generated.`,
      });
    }, 1200);
  };

  const handleDownloadExcel = () => {
    toast({
      title: "Excel Download Started",
      description: `Downloading ${getReportTypeName(reportType)} report for ${property === "all" ? "All Properties" : getPropertyName(property)} as Excel.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Excel Download Complete",
        description: "Your report has been downloaded successfully.",
      });
    }, 1500);
  };

  const handleDownloadReport = () => {
    toast({
      title: "PDF Download Started",
      description: `Downloading ${getReportTypeName(reportType)} report for ${property === "all" ? "All Properties" : getPropertyName(property)} as PDF.`,
    });
    
    setTimeout(() => {
      toast({
        title: "PDF Download Complete",
        description: "Your report has been downloaded successfully.",
      });
    }, 1500);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Uploading Excel File",
        description: `${file.name} is being processed...`,
      });

      setTimeout(() => {
        toast({
          title: "Excel File Uploaded",
          description: `${file.name} has been successfully processed and data has been updated.`,
        });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
    }
  };

  const getPropertyName = (propId: string) => {
    const properties: Record<string, string> = {
      "all": "All Properties",
      "prop1": "Property A",
      "prop2": "Property B",
      "prop3": "Property C"
    };
    return properties[propId] || propId;
  };

  const getReportTypeName = (type: string) => {
    const types: Record<string, string> = {
      maintenance: "Maintenance Categories",
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

  const renderChart = () => {
    switch (reportType) {
      case "maintenance":
        return (
          <ChartContainer className="h-80" config={chartConfig}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent className="justify-center mt-4" />} />
            </PieChart>
          </ChartContainer>
        );
      case "response":
        return (
          <ChartContainer className="h-80" config={chartConfig}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="avgTime" fill="#f59e0b" />
            </BarChart>
          </ChartContainer>
        );
      case "cost":
        return (
          <ChartContainer className="h-80" config={chartConfig}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="cost" fill="#10b981" />
            </BarChart>
          </ChartContainer>
        );
      case "satisfaction":
        return (
          <ChartContainer className="h-80" config={chartConfig}>
            <PieChart>
              <Pie
                data={satisfactionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {satisfactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent className="justify-center mt-4" />} />
            </PieChart>
          </ChartContainer>
        );
      default:
        return null;
    }
  };

  const renderDataTable = () => {
    if (!showDataTable) return null;

    let tableData: any[] = [];
    let columns: string[] = [];

    switch (reportType) {
      case "maintenance":
        tableData = categoryData;
        columns = ["Category", "Number of Issues"];
        break;
      case "response":
        tableData = responseTimeData;
        columns = ["Category", "Average Response Time (hrs)"];
        break;
      case "cost":
        tableData = costData;
        columns = ["Month", "Cost ($)"];
        break;
      case "satisfaction":
        tableData = satisfactionData;
        columns = ["Rating", "Percentage (%)"];
        break;
    }

    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Report Data</h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleDownloadExcel}
              className="flex items-center gap-2"
            >
              <FileSpreadsheetIcon className="h-4 w-4" />
              <span>Download Excel</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleUploadClick}
              className="flex items-center gap-2"
            >
              <UploadIcon className="h-4 w-4" />
              <span>Upload Excel</span>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                {reportType === "maintenance" && (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </>
                )}
                {reportType === "response" && (
                  <>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.avgTime}</TableCell>
                  </>
                )}
                {reportType === "cost" && (
                  <>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>${row.cost}</TableCell>
                  </>
                )}
                {reportType === "satisfaction" && (
                  <>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}%</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Reports</CardTitle>
        <CardDescription>Generate and view maintenance performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">
                  <div className="flex items-center">
                    <PieChartIcon className="h-4 w-4 mr-2" />
                    Maintenance Categories
                  </div>
                </SelectItem>
                <SelectItem value="response">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Response Time
                  </div>
                </SelectItem>
                <SelectItem value="cost">
                  <div className="flex items-center">
                    <BarChartIcon className="h-4 w-4 mr-2" />
                    Cost Analysis
                  </div>
                </SelectItem>
                <SelectItem value="satisfaction">
                  <div className="flex items-center">
                    <PieChartIcon className="h-4 w-4 mr-2" />
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
          
          <div className="flex flex-col justify-end">
            <div className="flex space-x-2">
              <Button 
                className="flex-1" 
                onClick={handleGenerateReport}
                disabled={isGenerating || (dateRange === "custom" && (!date || !endDate))}
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDownloadReport}
              >
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {dateRange === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Card className="bg-muted/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{getReportTypeName(reportType)} Report</CardTitle>
            <CardDescription>
              {getDateRangeName(dateRange)}
              {property !== "all" && ` • ${property === "prop1" ? "Property A" : property === "prop2" ? "Property B" : "Property C"}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderChart()}
            {renderDataTable()}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Reports;
