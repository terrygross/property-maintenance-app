
import React from "react";
import { useCompliance } from "@/context/ComplianceContext";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskDetails from "./TaskDetails";

const AlertSummary = () => {
  const { tasks, getAlertCount } = useCompliance();
  const alertCounts = getAlertCount();
  const [selectedTask, setSelectedTask] = React.useState(null);
  
  // Get tasks sorted by alert level (red, amber, green)
  const sortedTasks = [...tasks]
    .filter(task => task.alertLevel !== "none")
    .sort((a, b) => {
      const alertPriority = { red: 3, amber: 2, green: 1, none: 0 };
      return alertPriority[b.alertLevel] - alertPriority[a.alertLevel];
    })
    .slice(0, 5); // Only show top 5 alerts
  
  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <AlertCountCard color="red" count={alertCounts.red} title="Urgent" />
          <AlertCountCard color="amber" count={alertCounts.amber} title="Warning" />
          <AlertCountCard color="green" count={alertCounts.green} title="Upcoming" />
        </div>
        
        <div className="space-y-3 mt-4">
          <h3 className="text-sm font-medium">Alert Details</h3>
          
          {sortedTasks.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No alerts at this time
            </div>
          ) : (
            sortedTasks.map(task => (
              <Button
                key={task.id}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-2 ${getAlertBackground(task.alertLevel)}`}
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className={`h-4 w-4 mt-0.5 ${getAlertTextColor(task.alertLevel)}`} />
                  <div>
                    <div className="font-medium text-sm">{task.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Due: {task.dueDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Button>
            ))
          )}
        </div>
      </div>
      
      {selectedTask && (
        <TaskDetails 
          task={selectedTask} 
          open={!!selectedTask} 
          onOpenChange={(open) => !open && setSelectedTask(null)} 
        />
      )}
    </>
  );
};

const AlertCountCard = ({ color, count, title }: { color: string; count: number; title: string }) => {
  const bgColor = {
    red: "bg-red-50 border-red-200",
    amber: "bg-amber-50 border-amber-200",
    green: "bg-green-50 border-green-200"
  }[color];
  
  const textColor = {
    red: "text-red-700",
    amber: "text-amber-700",
    green: "text-green-700"
  }[color];
  
  return (
    <div className={`rounded-md border p-2 text-center ${bgColor}`}>
      <div className={`text-2xl font-bold ${textColor}`}>{count}</div>
      <div className={`text-xs ${textColor}`}>{title}</div>
    </div>
  );
};

const getAlertBackground = (alertLevel: string) => {
  switch (alertLevel) {
    case "red": return "bg-red-50 border-red-200";
    case "amber": return "bg-amber-50 border-amber-200";
    case "green": return "bg-green-50 border-green-200";
    default: return "";
  }
};

const getAlertTextColor = (alertLevel: string) => {
  switch (alertLevel) {
    case "red": return "text-red-500";
    case "amber": return "text-amber-500";
    case "green": return "text-green-500";
    default: return "";
  }
};

export default AlertSummary;
