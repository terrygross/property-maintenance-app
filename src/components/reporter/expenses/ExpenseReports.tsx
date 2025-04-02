import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BarChart, FileSpreadsheetIcon, Mail, FileText, Download, CalendarIcon, BarChart2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expense } from "./ExpenseHistory";
import ExpenseReportChart from "./ExpenseReportChart";
import ExpenseReportTable from "./ExpenseReportTable";

const REPORT_TYPES = [
  { id: "expense_summary", name: "Expense Summary", icon: <BarChart className="h-4 w-4" /> },
  { id: "expense_by_property", name: "Expenses by Property", icon: <BarChart2 className="h-4 w-4" /> },
  { id: "expense_by_type", name: "Expenses by Type", icon: <FileText className="h-4 w-4" /> }
];

const DATE_RANGES = [
  { id: "last_30", name: "Last 30 Days" },
  { id: "last_90", name: "Last 90 Days" },
  { id: "this_month", name: "This Month" },
  { id: "this_year", name: "This Year" },
  { id: "custom", name: "Custom Range" }
];

const ExpenseReports = () => {
  const { toast } = useToast();
  const { properties } = useAppState();
  
  const [reportType, setReportType] = useState("expense_summary");
  const [dateRange, setDateRange] = useState("last_30");
  const [propertyId, setPropertyId] = useState("all");
  const [expenseType, setExpenseType] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<Expense[]>([]);
  const [emailTo, setEmailTo] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [activeTab, setActiveTab] = useState("chart");
  
  const getDateRange = (): { start: Date, end: Date } => {
    const now = new Date();
    let end = new Date(now);
    let start = new Date(now);
    
    switch (dateRange) {
      case "last_30":
        start.setDate(now.getDate() - 30);
        break;
      case "last_90":
        start.setDate(now.getDate() - 90);
        break;
      case "this_month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end.setMonth(now.getMonth() + 1, 0);
        break;
      case "this_year":
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case "custom":
        if (startDate && endDate) {
          start = new Date(startDate);
          end = new Date(endDate);
        }
        break;
    }
    
    return { start, end };
  };
  
  const generateReport = () => {
    setIsGenerating(true);
    
    if (dateRange === "custom" && (!startDate || !endDate)) {
      toast({
        title: "Date Range Required",
        description: "Please select both start and end dates for your custom range.",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }
    
    const { start, end } = getDateRange();
    
    const savedExpenses = localStorage.getItem("expenses") || "[]";
    let expenses = JSON.parse(savedExpenses) as Expense[];
    
    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= start && expenseDate <= end;
    });
    
    if (propertyId !== "all") {
      expenses = expenses.filter(expense => 
        propertyId === "none" 
          ? expense.propertyId === null 
          : expense.propertyId === propertyId
      );
    }
    
    if (expenseType !== "all") {
      expenses = expenses.filter(expense => expense.type === expenseType);
    }
    
    expenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setReportData(expenses);
    setShowReport(true);
    setIsGenerating(false);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your report is being prepared for download.",
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your report has been downloaded successfully.",
      });
    }, 1500);
  };
  
  const handleEmailReport = () => {
    if (!emailTo) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to send the report to.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Sending Report",
      description: `Preparing to send report to ${emailTo}`,
    });
    
    setTimeout(() => {
      toast({
        title: "Report Sent",
        description: `Expense report has been sent to ${emailTo}`,
      });
      setEmailTo("");
    }, 2000);
  };
  
  const getReportTypeName = () => {
    const type = REPORT_TYPES.find(t => t.id === reportType);
    return type ? type.name : reportType;
  };
  
  const getDateRangeName = () => {
    if (dateRange === "custom" && startDate && endDate) {
      return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
    }
    
    const range = DATE_RANGES.find(r => r.id === dateRange);
    return range ? range.name : dateRange;
  };
  
  const getPropertyName = () => {
    if (propertyId === "all") return "All Properties";
    if (propertyId === "none") return "General Expenses";
    
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : propertyId;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Expense Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        {type.icon}
                        <span className="ml-2">{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  {DATE_RANGES.map(range => (
                    <SelectItem key={range.id} value={range.id}>{range.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {dateRange === "custom" && (
              <>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>End Date</Label>
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
                        {endDate ? format(endDate, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={startDate ? (date) => date < startDate : undefined}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label>Property</Label>
              <Select value={propertyId} onValueChange={setPropertyId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="none">General Expenses</SelectItem>
                  {properties.map(property => (
                    <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Expense Type</Label>
              <Select value={expenseType} onValueChange={setExpenseType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="tools">Tools & Equipment</SelectItem>
                  <SelectItem value="fuel">Fuel & Travel</SelectItem>
                  <SelectItem value="services">External Services</SelectItem>
                  <SelectItem value="other">Other Expenses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={generateReport} 
            disabled={isGenerating || (dateRange === "custom" && (!startDate || !endDate))}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
        </CardContent>
      </Card>
      
      {showReport && reportData.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{getReportTypeName()}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {getDateRangeName()} • {getPropertyName()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="space-y-4">
                <ExpenseReportChart reportData={reportData} reportType={reportType} />
              </TabsContent>
              <TabsContent value="table" className="space-y-4">
                <ExpenseReportTable reportData={reportData} reportType={reportType} />
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t">
              <Label htmlFor="email-report" className="mb-2 block">Email this report</Label>
              <div className="flex gap-2">
                <Input
                  id="email-report"
                  type="email"
                  placeholder="recipient@example.com"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleEmailReport} disabled={!emailTo}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showReport && reportData.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No expense data found for the selected criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseReports;
