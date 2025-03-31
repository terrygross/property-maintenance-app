
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface AssignedJobFooterProps {
  id: string;
  assignedTo: string;
  onResendEmail?: (id: string, technicianId: string) => void;
}

const AssignedJobFooter = ({ 
  id, 
  assignedTo,
  onResendEmail
}: AssignedJobFooterProps) => {
  if (!onResendEmail) {
    return <div className="w-full"></div>;
  }
  
  return (
    <div className="w-full">
      <Button 
        variant="secondary" 
        className="w-full flex items-center gap-2"
        onClick={() => onResendEmail(id, assignedTo)}
      >
        <Send className="h-4 w-4" />
        Resend Email
      </Button>
    </div>
  );
};

export default AssignedJobFooter;
