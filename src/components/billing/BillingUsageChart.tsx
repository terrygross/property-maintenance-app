
import { BarChart, Line, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

// Mock data for the billing usage chart
const usageData = [
  { month: "Jan", technicians: 6, stations: 3, extraTechs: 0, extraStations: 0 },
  { month: "Feb", technicians: 6, stations: 3, extraTechs: 0, extraStations: 0 },
  { month: "Mar", technicians: 6, stations: 3, extraTechs: 1, extraStations: 0 },
  { month: "Apr", technicians: 6, stations: 3, extraTechs: 1, extraStations: 1 },
  { month: "May", technicians: 6, stations: 3, extraTechs: 2, extraStations: 1 },
  { month: "Jun", technicians: 6, stations: 3, extraTechs: 2, extraStations: 2 },
];

// Calculate total for each month
const processedData = usageData.map(item => ({
  ...item,
  totalTechs: item.technicians + item.extraTechs,
  totalStations: item.stations + item.extraStations,
  // Calculate cost: base plan + extras (£20 per extra tech/station)
  totalCost: 2900/12 + (item.extraTechs + item.extraStations) * 20
}));

const BillingUsageChart = () => {
  const chartConfig = {
    technicians: {
      label: "Base Technicians",
      color: "#4F46E5",
    },
    extraTechs: {
      label: "Extra Technicians",
      color: "#8B5CF6",
    },
    stations: {
      label: "Base Stations",
      color: "#10B981",
    },
    extraStations: {
      label: "Extra Stations",
      color: "#6EE7B7",
    },
    totalCost: {
      label: "Monthly Cost (£)",
      color: "#EF4444",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Usage Trends
        </CardTitle>
        <CardDescription>
          View your subscription usage trends over the past months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="resources">Resource Usage</TabsTrigger>
            <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer 
                config={chartConfig}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={processedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      label={{ value: 'Technicians', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      label={{ value: 'Stations', angle: 90, position: 'insideRight' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">Technicians:</span>
                                  <span className="font-bold">{payload[0].payload.totalTechs}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({payload[0].payload.technicians} base + {payload[0].payload.extraTechs} extra)
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">Stations:</span>
                                  <span className="font-bold">{payload[0].payload.totalStations}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({payload[0].payload.stations} base + {payload[0].payload.extraStations} extra)
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="technicians" stackId="a" fill={chartConfig.technicians.color} name={chartConfig.technicians.label} />
                    <Bar yAxisId="left" dataKey="extraTechs" stackId="a" fill={chartConfig.extraTechs.color} name={chartConfig.extraTechs.label} />
                    <Bar yAxisId="right" dataKey="stations" stackId="b" fill={chartConfig.stations.color} name={chartConfig.stations.label} />
                    <Bar yAxisId="right" dataKey="extraStations" stackId="b" fill={chartConfig.extraStations.color} name={chartConfig.extraStations.label} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="cost" className="space-y-4">
            <div className="h-[300px]">
              <ChartContainer 
                config={chartConfig}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={processedData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis 
                      label={{ value: 'Monthly Cost (£)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{data.month} - Total Cost:</span>
                                <span className="text-xl font-bold">£{data.totalCost.toFixed(2)}</span>
                                <div className="mt-2 text-xs text-muted-foreground">
                                  <div>Base Plan: £{(2900/12).toFixed(2)}</div>
                                  <div>Extra Technicians: £{(data.extraTechs * 20).toFixed(2)}</div>
                                  <div>Extra Stations: £{(data.extraStations * 20).toFixed(2)}</div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="totalCost" 
                      stroke={chartConfig.totalCost.color} 
                      name={chartConfig.totalCost.label}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BillingUsageChart;
