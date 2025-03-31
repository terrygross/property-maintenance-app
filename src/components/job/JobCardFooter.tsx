
import UnassignedJobFooter from "./footer/UnassignedJobFooter";
import HighPriorityJobFooter from "./footer/HighPriorityJobFooter";
import AssignedJobFooter from "./footer/AssignedJobFooter";
import EmptyFooter from "./footer/EmptyFooter";

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
  // For unassigned jobs, show the assign button
  if (status === "unassigned") {
    return (
      <UnassignedJobFooter 
        id={id}
        priority={priority}
        onAssign={onAssign}
      />
    );
  }

  // For assigned jobs, show options based on the email status
  if (status === "assigned" && assignedTo) {
    // If this is a high priority job that needs acceptance
    if (priority === "high" && onAcceptJob) {
      return (
        <HighPriorityJobFooter 
          id={id}
          assignedTo={assignedTo}
          onAcceptJob={onAcceptJob}
          onResendEmail={onResendEmail}
        />
      );
    }
    
    // Regular assigned job with email option
    return (
      <AssignedJobFooter 
        id={id}
        assignedTo={assignedTo}
        onResendEmail={onResendEmail}
      />
    );
  }

  // Fallback for other statuses
  return <EmptyFooter />;
};

export default JobCardFooter;
