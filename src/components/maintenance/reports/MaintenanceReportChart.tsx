
import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

interface ChartConfig {
  [key: string]: {
    theme: {
      light: string;
      dark: string;
    }
  }
}

type ReportData = Array<{
  name?: string;
  category?: string;
  value?: number;
  avgTime?: number;
  month?: string;
  cost?: number;
  fill?: string;
}>;

interface MaintenanceReportChartProps {
  reportType: string;
  chartConfig: ChartConfig;
  data: ReportData;
}

const MaintenanceReportChart: React.FC<MaintenanceReportChartProps> = ({ 
  reportType, 
  chartConfig,
  data
}) => {
  switch (reportType) {
    case "maintenance":
      return (
        <ChartContainer className="h-80" config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
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
          <BarChart data={data}>
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
          <BarChart data={data}>
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
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
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

export default MaintenanceReportChart;
