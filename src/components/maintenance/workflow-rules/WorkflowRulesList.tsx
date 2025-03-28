
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WorkflowRule } from "./types";
import { WorkflowRuleActions } from "./WorkflowRuleActions";
import { useToast } from "@/hooks/use-toast";

interface WorkflowRulesListProps {
  rules: WorkflowRule[];
  triggerOptions: { value: string; label: string }[];
  actionOptions: { value: string; label: string }[];
  onAddRule: () => void;
  onEditRule: (rule: WorkflowRule) => void;
  onDeleteRule: (id: number) => void;
  onToggleRuleStatus: (id: number) => void;
}

export function WorkflowRulesList({
  rules,
  triggerOptions,
  actionOptions,
  onAddRule,
  onEditRule,
  onDeleteRule,
  onToggleRuleStatus,
}: WorkflowRulesListProps) {
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this workflow rule?")) {
      onDeleteRule(id);
      toast({
        title: "Success",
        description: "Workflow rule deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Workflow Rules</h2>
        <Button onClick={onAddRule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Trigger</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{rule.name}</TableCell>
              <TableCell>{rule.description}</TableCell>
              <TableCell>{triggerOptions.find(t => t.value === rule.trigger)?.label || rule.trigger}</TableCell>
              <TableCell>{actionOptions.find(a => a.value === rule.action)?.label || rule.action}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Checkbox
                    checked={rule.isActive}
                    onCheckedChange={() => onToggleRuleStatus(rule.id)}
                    id={`rule-status-${rule.id}`}
                  />
                  <Label
                    htmlFor={`rule-status-${rule.id}`}
                    className="ml-2 text-sm font-normal"
                  >
                    {rule.isActive ? "Active" : "Inactive"}
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <WorkflowRuleActions 
                  rule={rule} 
                  onEdit={() => onEditRule(rule)} 
                  onDelete={() => handleDelete(rule.id)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
