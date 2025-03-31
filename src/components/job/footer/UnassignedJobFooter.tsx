
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AssignJobDialog from "../AssignJobDialog";

interface UnassignedJobFooterProps {
  id: string;
  priority: string;
  onAssign?: (id: string, technicianId: string, priority: string) => void;
}

const UnassignedJobFooter = ({ 
  id, 
  priority,
  onAssign 
}: UnassignedJobFooterProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
};

export default UnassignedJobFooter;
