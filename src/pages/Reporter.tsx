
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChartBar, ChartPie, Calendar, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ReportFilters from "@/components/reporter/ReportFilters";
import ReportSummary from "@/components/reporter/ReportSummary";
import ReportChartTabs from "@/components/reporter/ReportChartTabs";
import { getReportTypeName, getDateRangeName, getReportTypeIcon } from "@/components/reporter/utils";

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
        <ReportFilters
          reportType={reportType}
          setReportType={setReportType}
          dateRange={dateRange}
          setDateRange={setDateRange}
          property={property}
          setProperty={setProperty}
          date={date}
          setDate={setDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleGenerateReport={handleGenerateReport}
          isGeneratingReport={isGeneratingReport}
        />

        <ReportSummary
          reportType={reportType}
          dateRange={dateRange}
          property={property}
          getReportTypeName={getReportTypeName}
          getDateRangeName={getDateRangeName}
          getReportTypeIcon={getReportTypeIcon}
        />

        <ReportChartTabs />
      </div>
    </div>
  );
};

export default Reporter;
