
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface AssignedJobFooterProps {
  id: string;
  assignedTo: string;
  onResendEmail?: (id: string, technicianId: string) => void;
  onAcceptJob?: (id: string) => void;
}

const AssignedJobFooter = ({ 
  id, 
  assignedTo,
  onResendEmail,
  onAcceptJob
}: AssignedJobFooterProps) => {
  if (!onResendEmail && !onAcceptJob) {
    return <div className="w-full"></div>;
  }
  
  return (
    <div className="w-full flex items-center gap-2">
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
      
      {onAcceptJob && (
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => onAcceptJob(id)}
        >
          Accept Job
        </Button>
      )}
    </div>
  );
};

export default AssignedJobFooter;
