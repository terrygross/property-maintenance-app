
import React from "react";
import NewTaskDialog from "./NewTaskDialog";
import { Property } from "@/types/property";

interface TaskDialogManagerProps {
  showNewTaskDialog: boolean;
  setShowNewTaskDialog: (show: boolean) => void;
  technicians: any[];
  properties: Property[];
}

const TaskDialogManager = ({ 
  showNewTaskDialog, 
  setShowNewTaskDialog, 
  technicians, 
  properties 
}: TaskDialogManagerProps) => {
  return (
    <NewTaskDialog
      open={showNewTaskDialog}
      onOpenChange={setShowNewTaskDialog}
      technicians={technicians}
      properties={properties}
    />
  );
};

export default TaskDialogManager;
