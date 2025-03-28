
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Import refactored components and utilities
import ReportFilters from "./reports/ReportFilters";
import ReportDateRangePicker from "./reports/ReportDateRangePicker";
import MaintenanceReportChart from "./reports/MaintenanceReportChart";
import ReportDataTable from "./reports/ReportDataTable";
import ReportHeader from "./reports/ReportHeader";
import { useReportHelpers } from "./reports/useReportHelpers";
import { 
  categoryData, 
  responseTimeData, 
  costData, 
  satisfactionData, 
  chartConfig 
} from "./reports/mockReportData";

const Reports = () => {
  const [reportType, setReportType] = useState("maintenance");
  const [dateRange, setDateRange] = useState("30days");
  const [property, setProperty] = useState("all");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  
  const {
    fileInputRef,
    getPropertyName,
    getReportTypeName,
    getDateRangeName,
    handleDownloadExcel,
    handleDownloadReport,
    handleUploadClick,
    handleFileUpload
  } = useReportHelpers();

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

  // Reset date values when changing date range
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    if (value !== "custom") {
      setDate(undefined);
      setEndDate(undefined);
    }
  };

  // Determine which data to use based on report type
  const getReportData = () => {
    switch (reportType) {
      case "maintenance":
        return categoryData;
      case "response":
        return responseTimeData;
      case "cost":
        return costData;
      case "satisfaction":
        return satisfactionData;
      default:
        return [];
    }
  };

  // Check if custom date range is valid
  const isDateRangeValid = dateRange !== "custom" || (date !== undefined && endDate !== undefined);

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <ReportFilters
          reportType={reportType}
          setReportType={setReportType}
          dateRange={dateRange}
          setDateRange={handleDateRangeChange}
          property={property}
          setProperty={setProperty}
          handleGenerateReport={handleGenerateReport}
          isGenerating={isGenerating}
          showDateRangePicker={dateRange === "custom"}
          dateRangeValid={isDateRangeValid}
        />

        {dateRange === "custom" && (
          <ReportDateRangePicker
            date={date}
            setDate={setDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )}

        <Card className="bg-muted/20">
          <CardContent className="p-6">
            <ReportHeader
              reportType={reportType}
              dateRange={dateRange}
              property={property}
              getReportTypeName={getReportTypeName}
              getDateRangeName={getDateRangeName}
              getPropertyName={getPropertyName}
              handleDownloadReport={handleDownloadReport}
            />
            
            <MaintenanceReportChart
              reportType={reportType}
              chartConfig={chartConfig}
              data={getReportData()}
            />
            
            {showDataTable && (
              <ReportDataTable
                reportType={reportType}
                tableData={getReportData()}
                handleDownloadExcel={handleDownloadExcel}
                handleUploadClick={handleUploadClick}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
              />
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Reports;
