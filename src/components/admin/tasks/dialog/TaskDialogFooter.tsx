
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface TaskDialogFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const TaskDialogFooter = ({ onCancel, onSubmit }: TaskDialogFooterProps) => {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={onSubmit}>Create Task</Button>
    </DialogFooter>
  );
};

export default TaskDialogFooter;
