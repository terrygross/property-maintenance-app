
// Mock data for different report types
export const categoryData = [
  { name: "Plumbing", value: 32, fill: "#0ea5e9" },
  { name: "Electrical", value: 25, fill: "#f59e0b" },
  { name: "HVAC", value: 18, fill: "#10b981" },
  { name: "Appliances", value: 15, fill: "#6366f1" },
  { name: "Structural", value: 10, fill: "#ec4899" }
];

export const responseTimeData = [
  { category: "Plumbing", avgTime: 4.2 },
  { category: "Electrical", avgTime: 3.8 },
  { name: "HVAC", avgTime: 6.5 },
  { category: "Appliances", avgTime: 5.1 },
  { category: "Structural", avgTime: 8.2 }
];

export const costData = [
  { month: 'Jan', cost: 4200 },
  { month: 'Feb', cost: 3800 },
  { month: 'Mar', cost: 5600 },
  { month: 'Apr', cost: 4900 },
  { month: 'May', cost: 6200 },
  { month: 'Jun', cost: 5100 }
];

export const satisfactionData = [
  { name: "Very Satisfied", value: 45, fill: "#10b981" },
  { name: "Satisfied", value: 30, fill: "#0ea5e9" },
  { name: "Neutral", value: 15, fill: "#f59e0b" },
  { name: "Dissatisfied", value: 7, fill: "#ec4899" },
  { name: "Very Dissatisfied", value: 3, fill: "#ef4444" }
];

export const chartConfig = {
  maintenance: {
    theme: {
      light: "#0ea5e9",
      dark: "#0ea5e9"
    }
  },
  response: {
    theme: {
      light: "#f59e0b",
      dark: "#f59e0b"
    }
  },
  cost: {
    theme: {
      light: "#10b981",
      dark: "#10b981"
    }
  },
  satisfaction: {
    theme: {
      light: "#6366f1",
      dark: "#6366f1"
    }
  }
};
