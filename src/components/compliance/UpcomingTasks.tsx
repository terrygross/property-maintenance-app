
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCompliance } from "@/context/ComplianceContext";
import TaskDetails from "./TaskDetails";

const UpcomingTasks = () => {
  const { getUpcomingTasks } = useCompliance();
  const upcomingTasks = getUpcomingTasks().slice(0, 5);
  const [selectedTask, setSelectedTask] = React.useState(null);
  
  const getAlertBadge = (alertLevel: string) => {
    switch (alertLevel) {
      case "red":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "amber":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "green":
        return <Badge className="bg-green-500">Upcoming</Badge>;
      default:
        return <Badge variant="outline">Scheduled</Badge>;
    }
  };
  
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Alert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No upcoming tasks
                </TableCell>
              </TableRow>
            ) : (
              upcomingTasks.map(task => (
                <TableRow 
                  key={task.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedTask(task)}
                >
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.category}</TableCell>
                  <TableCell>{task.dueDate.toLocaleDateString()}</TableCell>
                  <TableCell>{getAlertBadge(task.alertLevel)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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

export default UpcomingTasks;
