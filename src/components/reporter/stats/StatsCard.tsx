
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  color?: string; // Added color as an optional prop
}

const StatsCard = ({ title, value, description, icon: Icon, color = "blue" }: StatsCardProps) => {
  // Determine text color class based on the color prop
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case "blue": return "text-blue-600";
      case "green": return "text-green-600";
      case "amber": return "text-amber-600";
      case "indigo": return "text-indigo-600";
      case "red": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  const colorClass = getColorClass(color);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${colorClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
