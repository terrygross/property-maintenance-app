
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportSummaryProps {
  reportType: string;
  dateRange: string;
  property: string;
  getReportTypeName: (type: string) => string;
  getDateRangeName: (range: string) => string;
  getReportTypeIcon: (type: string) => JSX.Element;
}

const ReportSummary = ({
  reportType,
  dateRange,
  property,
  getReportTypeName,
  getDateRangeName,
  getReportTypeIcon
}: ReportSummaryProps) => {
  return (
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
  );
};

export default ReportSummary;
