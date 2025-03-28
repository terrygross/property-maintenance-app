
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReportHeaderProps {
  reportType: string;
  dateRange: string;
  property: string;
  getReportTypeName: (type: string) => string;
  getDateRangeName: (range: string) => string;
  getPropertyName: (propId: string) => string;
  handleDownloadReport: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  reportType,
  dateRange,
  property,
  getReportTypeName,
  getDateRangeName,
  getPropertyName,
  handleDownloadReport
}) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-lg">{getReportTypeName(reportType)} Report</CardTitle>
        <CardDescription>
          {getDateRangeName(dateRange)}
          {property !== "all" && ` • ${getPropertyName(property)}`}
        </CardDescription>
      </div>
      <Button 
        variant="outline" 
        onClick={handleDownloadReport}
      >
        <DownloadIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ReportHeader;
