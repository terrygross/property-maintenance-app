
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  id: string;
  label: string;
  icon: LucideIcon;
  count: number | null;
  description: string;
  bgColorClass: string;
  iconColorClass: string;
  onClick: () => void;
}

const DashboardCard = ({
  id,
  label,
  icon: Icon,
  count,
  description,
  bgColorClass,
  iconColorClass,
  onClick
}: DashboardCardProps) => {
  // Format dynamic description for reporter management card only
  const formattedDescription = 
    id === "reporter-management" && description.includes("Base") 
      ? "Base (2) + (1) Additional station"
      : description;

  return (
    <Card 
      key={id}
      className={`${bgColorClass} transition-colors cursor-pointer border-2`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{label}</CardTitle>
          <Icon className={`h-5 w-5 ${iconColorClass}`} />
        </div>
      </CardHeader>
      <CardContent>
        {count !== null && (
          <>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs text-muted-foreground">{formattedDescription}</p>
          </>
        )}
        {count === null && (
          <p className="text-sm text-muted-foreground">{formattedDescription || "View & manage"}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
