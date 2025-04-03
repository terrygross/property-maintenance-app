
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock } from "lucide-react";
import { useCompliance } from "@/context/ComplianceContext";
import TaskDetails from "./TaskDetails";

interface TaskSummaryProps {
  date?: Date;
  onAddTask: () => void;
}

const TaskSummary = ({ date, onAddTask }: TaskSummaryProps) => {
  const { tasks } = useCompliance();
  const [selectedTask, setSelectedTask] = React.useState(null);
  
  // Filter tasks for the selected date
  const tasksForDate = date
    ? tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getDate() === date.getDate() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getFullYear() === date.getFullYear()
        );
      })
    : [];
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md">
            {date ? format(date, "MMMM d, yyyy") : "Select a date"}
          </CardTitle>
          <Button onClick={onAddTask} size="sm" variant="ghost">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {tasksForDate.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {date 
                ? "No tasks scheduled for this date" 
                : "Select a date to view tasks"}
            </div>
          ) : (
            <div className="space-y-4">
              {tasksForDate.map(task => (
                <div 
                  key={task.id} 
                  className="border rounded-md p-3 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.category}</div>
                  <div className="flex items-center text-xs mt-2">
                    <Clock className="h-3 w-3 mr-1" />
                    {getStatusText(task.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
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

const format = (date: Date, formatStr: string) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending": return "Needs confirmation";
    case "confirmed": return "Confirmed, not completed";
    case "completed": return "Completed";
    default: return "Unknown status";
  }
};

export default TaskSummary;
