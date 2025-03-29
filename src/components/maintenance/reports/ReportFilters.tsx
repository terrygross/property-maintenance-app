
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChartIcon, BarChartIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/context/AppStateContext";

interface ReportFiltersProps {
  reportType: string;
  setReportType: (value: string) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  property: string;
  setProperty: (value: string) => void;
  handleGenerateReport: () => void;
  isGenerating: boolean;
  showDateRangePicker: boolean;
  dateRangeValid: boolean;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  reportType,
  setReportType,
  dateRange,
  setDateRange,
  property,
  setProperty,
  handleGenerateReport,
  isGenerating,
  showDateRangePicker,
  dateRangeValid
}) => {
  const { properties } = useAppState();
  
  return (
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
          onValueChange={setDateRange}
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
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col justify-end">
        <Button 
          className="flex-1" 
          onClick={handleGenerateReport}
          disabled={isGenerating || (showDateRangePicker && !dateRangeValid)}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
