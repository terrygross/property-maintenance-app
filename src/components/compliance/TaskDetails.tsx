
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  FileText, 
  User, 
  CheckCircle2, 
  Repeat 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ComplianceTask, useCompliance } from "@/context/ComplianceContext";

interface TaskDetailsProps {
  task: ComplianceTask;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskDetails = ({ task, open, onOpenChange }: TaskDetailsProps) => {
  const { confirmTask, completeTask } = useCompliance();
  
  const handleConfirm = () => {
    confirmTask(task.id);
    onOpenChange(false);
  };
  
  const handleComplete = () => {
    completeTask(task.id);
    onOpenChange(false);
  };
  
  const getAlertBadge = (alertLevel: string) => {
    switch (alertLevel) {
      case "red":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "amber":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "green":
        return <Badge className="bg-green-500">Upcoming</Badge>;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Confirmed</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-green-500 border-green-500">Completed</Badge>;
      default:
        return null;
    }
  };
  
  const getRecurrenceText = (recurrence: string) => {
    switch (recurrence) {
      case "none":
        return "One-time task";
      case "monthly":
        return "Repeats monthly";
      case "quarterly":
        return "Repeats quarterly";
      case "biannual":
        return "Repeats every 6 months";
      case "annual":
        return "Repeats annually";
      default:
        return "Unknown recurrence";
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {task.title} {getAlertBadge(task.alertLevel)}
          </DialogTitle>
          <DialogDescription>
            Task details and management options
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Due: {task.dueDate.toLocaleDateString()}</span>
            </div>
            <div>{getStatusBadge(task.status)}</div>
          </div>
          
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-muted-foreground" />
            <span>{getRecurrenceText(task.recurrence)}</span>
          </div>
          
          {task.assignedTo && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Assigned to: {task.assignedTo}</span>
            </div>
          )}
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Category</h4>
            <Badge variant="outline">{task.category}</Badge>
          </div>
          
          {task.documentUrls && task.documentUrls.length > 0 && (
            <div>
              <h4 className="font-medium mb-1">Documents</h4>
              <ul className="space-y-1">
                {task.documentUrls.map((url, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      Document {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2">
          {task.status === "pending" && (
            <Button onClick={handleConfirm} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Confirm Task
            </Button>
          )}
          {task.status === "confirmed" && (
            <Button onClick={handleComplete} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Mark as Completed
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetails;
