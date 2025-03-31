
import { Button } from "@/components/ui/button";
import { Check, Send } from "lucide-react";
import AssignJobDialog from "./AssignJobDialog";
import { useState } from "react";

interface JobCardFooterProps {
  id: string;
  status: string;
  priority: string;
  assignedTo?: string;
  onAssign?: (id: string, technicianId: string, priority: string) => void;
  onResendEmail?: (id: string, technicianId: string) => void;
  onAcceptJob?: (id: string) => void;
}

const JobCardFooter = ({ 
  id, 
  status, 
  priority, 
  assignedTo, 
  onAssign,
  onResendEmail,
  onAcceptJob
}: JobCardFooterProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // For unassigned jobs, show the assign button
  if (status === "unassigned") {
    return (
      <div className="w-full">
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => setDialogOpen(true)}
        >
          Assign Job
        </Button>
        {onAssign && (
          <AssignJobDialog 
            jobId={id}
            priority={priority}
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onAssign={onAssign}
          />
        )}
      </div>
    );
  }

  // For assigned jobs, show options based on the email status
  if (status === "assigned" && assignedTo) {
    // If this is a high priority job that needs acceptance
    if (priority === "high" && onAcceptJob) {
      return (
        <div className="w-full flex flex-col gap-2">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => onAcceptJob(id)}
          >
            <Check className="h-4 w-4" />
            Accept on Behalf
          </Button>
          
          {onResendEmail && (
            <Button 
              variant="secondary" 
              className="w-full flex items-center gap-2"
              onClick={() => onResendEmail(id, assignedTo)}
            >
              <Send className="h-4 w-4" />
              Resend Email
            </Button>
          )}
        </div>
      );
    }
    
    // Regular assigned job with email option
    return (
      <div className="w-full">
        {onResendEmail && (
          <Button 
            variant="secondary" 
            className="w-full flex items-center gap-2"
            onClick={() => onResendEmail(id, assignedTo)}
          >
            <Send className="h-4 w-4" />
            Resend Email
          </Button>
        )}
      </div>
    );
  }

  // Fallback for other statuses
  return <div className="w-full"></div>;
};

export default JobCardFooter;
