
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AssignJobDialog from "../AssignJobDialog";

interface HighPriorityJobFooterProps {
  id: string;
  priority: string;
  onAssign?: (id: string, technicianId: string, priority: string) => void;
  onAcceptJob?: (id: string) => void;
}

const HighPriorityJobFooter = ({ 
  id, 
  priority,
  onAssign,
  onAcceptJob
}: HighPriorityJobFooterProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      {onAcceptJob ? (
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => onAcceptJob(id)}
        >
          Accept Job
        </Button>
      ) : (
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => setDialogOpen(true)}
        >
          Assign Job
        </Button>
      )}
      
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
};

export default HighPriorityJobFooter;
