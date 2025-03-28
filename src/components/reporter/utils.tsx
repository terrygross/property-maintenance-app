
import { ChartBar, ChartPie, Calendar, FileText } from "lucide-react";

export const getReportTypeName = (type: string) => {
  const types: Record<string, string> = {
    maintenance: "Maintenance Summary",
    response: "Response Time",
    cost: "Cost Analysis",
    satisfaction: "Tenant Satisfaction"
  };
  return types[type] || type;
};

export const getDateRangeName = (range: string) => {
  const ranges: Record<string, string> = {
    "30days": "Last 30 Days",
    "90days": "Last 90 Days",
    "ytd": "Year to Date",
    "custom": "Custom Range"
  };
  return ranges[range] || range;
};

export const getReportTypeIcon = (type: string) => {
  switch (type) {
    case "maintenance":
      return <FileText className="h-4 w-4 mr-2" />;
    case "response":
      return <Calendar className="h-4 w-4 mr-2" />;
    case "cost":
      return <ChartBar className="h-4 w-4 mr-2" />;
    case "satisfaction":
      return <ChartPie className="h-4 w-4 mr-2" />;
    default:
      return <FileText className="h-4 w-4 mr-2" />;
  }
};
