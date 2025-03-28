
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ChartBar, ChartPie, FileText } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ReportFiltersProps {
  reportType: string;
  setReportType: (value: string) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  property: string;
  setProperty: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  handleGenerateReport: () => void;
  isGeneratingReport: boolean;
}

const ReportFilters = ({
  reportType,
  setReportType,
  dateRange,
  setDateRange,
  property,
  setProperty,
  date,
  setDate,
  endDate,
  setEndDate,
  handleGenerateReport,
  isGeneratingReport
}: ReportFiltersProps) => {
  return (
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
  );
};

export default ReportFilters;
