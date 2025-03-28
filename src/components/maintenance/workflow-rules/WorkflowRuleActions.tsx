
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowRule } from "./types";

interface WorkflowRuleActionsProps {
  rule: WorkflowRule;
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkflowRuleActions({ rule, onEdit, onDelete }: WorkflowRuleActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
