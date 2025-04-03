
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, AlertTriangle } from "lucide-react";
import { useCompliance } from "@/context/ComplianceContext";
import { useNavigate } from "react-router-dom";

const ComplianceBoardCard = () => {
  const { getAlertCount, tasks } = useCompliance();
  const navigate = useNavigate();
  const alertCounts = getAlertCount();
  
  const totalAlerts = alertCounts.red + alertCounts.amber + alertCounts.green;
  const upcomingTasks = tasks.filter(t => t.status === "pending").length;
  
  // Determine if there are urgent alerts (red)
  const hasUrgentAlerts = alertCounts.red > 0;
  
  return (
    <Card 
      className={`transition-colors cursor-pointer border-2 ${
        hasUrgentAlerts ? 'bg-red-50 border-red-200 animate-pulse' : 'bg-blue-50 border-blue-100'
      }`}
      onClick={() => navigate("/my-board")}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">My Board</CardTitle>
          {hasUrgentAlerts ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : (
            <CalendarCheck className="h-5 w-5 text-blue-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{totalAlerts}</p>
        <p className="text-xs text-muted-foreground">
          {totalAlerts > 0 
            ? `${totalAlerts} alert${totalAlerts !== 1 ? 's' : ''} requiring attention` 
            : "No current alerts"}
        </p>
      </CardContent>
    </Card>
  );
};

export default ComplianceBoardCard;
