
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WorkflowRule } from "./types";
import { useToast } from "@/hooks/use-toast";

interface WorkflowRuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: WorkflowRule) => void;
  currentRule: WorkflowRule | null;
  triggerOptions: { value: string; label: string }[];
  actionOptions: { value: string; label: string }[];
}

export function WorkflowRuleDialog({
  isOpen,
  onClose,
  onSave,
  currentRule,
  triggerOptions,
  actionOptions,
}: WorkflowRuleDialogProps) {
  const [rule, setRule] = useState<WorkflowRule | null>(null);
  const { toast } = useToast();

  // Update local state when currentRule changes
  useEffect(() => {
    if (currentRule) {
      setRule({ ...currentRule });
    }
  }, [currentRule]);

  const handleSave = () => {
    if (!rule) return;
    
    if (!rule.name.trim()) {
      toast({
        title: "Error",
        description: "Rule name is required",
        variant: "destructive",
      });
      return;
    }

    onSave(rule);
  };

  if (!rule) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {rule.id ? "Edit Workflow Rule" : "Add Workflow Rule"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={rule.name}
              onChange={(e) =>
                setRule({ ...rule, name: e.target.value })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={rule.description}
              onChange={(e) =>
                setRule({ ...rule, description: e.target.value })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trigger">Trigger Event</Label>
            <Select
              value={rule.trigger}
              onValueChange={(value) =>
                setRule({ ...rule, trigger: value })
              }
            >
              <SelectTrigger id="trigger">
                <SelectValue placeholder="Select trigger event" />
              </SelectTrigger>
              <SelectContent>
                {triggerOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition (optional)</Label>
            <Input
              id="condition"
              placeholder="e.g. priority == 'High'"
              value={rule.condition}
              onChange={(e) =>
                setRule({ ...rule, condition: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Simple conditions like &quot;priority == &apos;High&apos;&quot; or &quot;days_overdue &gt; 2&quot;
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="action">Action</Label>
            <Select
              value={rule.action}
              onValueChange={(value) =>
                setRule({ ...rule, action: value })
              }
            >
              <SelectTrigger id="action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                {actionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {(rule.action === "notify_role" || rule.action === "notify_user") && (
            <div className="space-y-2">
              <Label htmlFor="actionTarget">Target {rule.action === "notify_role" ? "Role" : "User"}</Label>
              <Input
                id="actionTarget"
                placeholder={rule.action === "notify_role" ? "e.g. maintenance_manager" : "User ID or email"}
                value={rule.actionTarget}
                onChange={(e) =>
                  setRule({ ...rule, actionTarget: e.target.value })
                }
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="isActive"
              checked={rule.isActive}
              onCheckedChange={(checked) =>
                setRule({ ...rule, isActive: !!checked })
              }
            />
            <Label htmlFor="isActive">Rule is active</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
