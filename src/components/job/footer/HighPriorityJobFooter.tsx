
import { Button } from "@/components/ui/button";
import { Check, Send } from "lucide-react";

interface HighPriorityJobFooterProps {
  id: string;
  assignedTo: string;
  onAcceptJob: (id: string) => void;
  onResendEmail?: (id: string, technicianId: string) => void;
}

const HighPriorityJobFooter = ({ 
  id, 
  assignedTo,
  onAcceptJob,
  onResendEmail
}: HighPriorityJobFooterProps) => {
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
};

export default HighPriorityJobFooter;
