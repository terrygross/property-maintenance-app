
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
    if (priority === "high") {
      return (
        <HighPriorityJobFooter 
          id={id}
          priority={priority}
          onAssign={onAssign}
        />
      );
    }
    
    return (
      <UnassignedJobFooter 
        id={id}
        priority={priority}
        onAssign={onAssign}
      />
    );
  }

  // For assigned jobs, show the email resend option for contractors
  if (status === "assigned" && assignedTo) {
    return (
      <AssignedJobFooter 
        id={id}
        assignedTo={assignedTo}
        onResendEmail={onResendEmail}
        onAcceptJob={onAcceptJob}
      />
    );
  }

  // Fallback for other statuses
  return <EmptyFooter />;
};

export default JobCardFooter;
