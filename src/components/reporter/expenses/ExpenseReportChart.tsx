
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Expense } from "./ExpenseHistory";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";

interface ExpenseReportChartProps {
  reportData: Expense[];
  reportType: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'];

const EXPENSE_TYPES: Record<string, string> = {
  materials: "Materials",
  tools: "Tools & Equipment",
  fuel: "Fuel & Travel",
  services: "External Services",
  other: "Other Expenses"
};

const ExpenseReportChart = ({ reportData, reportType }: ExpenseReportChartProps) => {
  const { properties } = useAppState();
  
  // Function to get property name
  const getPropertyName = (propertyId: string | null) => {
    if (!propertyId) return "General";
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : "Unknown";
  };
  
  // Function to prepare data based on report type
  const prepareChartData = () => {
    if (reportType === "expense_by_property") {
      // Group expenses by property
      const propertyMap = new Map<string, number>();
      
      reportData.forEach(expense => {
        const propId = expense.propertyId || 'general';
        const propName = getPropertyName(expense.propertyId);
        const key = `${propName}`;
        
        if (propertyMap.has(key)) {
          propertyMap.set(key, propertyMap.get(key)! + expense.amount);
        } else {
          propertyMap.set(key, expense.amount);
        }
      });
      
      return Array.from(propertyMap.entries()).map(([name, value]) => ({
        name,
        value
      }));
    } 
    else if (reportType === "expense_by_type") {
      // Group expenses by type
      const typeMap = new Map<string, number>();
      
      reportData.forEach(expense => {
        const typeName = EXPENSE_TYPES[expense.type] || expense.type;
        
        if (typeMap.has(typeName)) {
          typeMap.set(typeName, typeMap.get(typeName)! + expense.amount);
        } else {
          typeMap.set(typeName, expense.amount);
        }
      });
      
      return Array.from(typeMap.entries()).map(([name, value]) => ({
        name,
        value
      }));
    }
    else {
      // Expense summary by month
      const monthMap = new Map<string, number>();
      
      // Sort data by date
      const sortedData = [...reportData].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      sortedData.forEach(expense => {
        const date = new Date(expense.date);
        const monthKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (monthMap.has(monthKey)) {
          monthMap.set(monthKey, monthMap.get(monthKey)! + expense.amount);
        } else {
          monthMap.set(monthKey, expense.amount);
        }
      });
      
      return Array.from(monthMap.entries()).map(([name, value]) => ({
        name,
        value
      }));
    }
  };
  
  const chartData = prepareChartData();
  
  // Determine if we should use Pie chart or Bar chart
  const shouldUsePieChart = reportType === "expense_by_type" || reportType === "expense_by_property";
  
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {shouldUsePieChart ? (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} 
                />
                <Legend />
              </PieChart>
            ) : (
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} 
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6" 
                  name="Amount" 
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseReportChart;
