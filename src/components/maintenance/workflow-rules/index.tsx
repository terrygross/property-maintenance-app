
import { useState } from "react";
import { WorkflowRulesList } from "./WorkflowRulesList";
import { WorkflowRuleDialog } from "./WorkflowRuleDialog";
import { WorkflowRule } from "./types";
import { initialRules, triggerOptions, actionOptions } from "./mockData";
import { useToast } from "@/hooks/use-toast";

const WorkflowRules = () => {
  const [rules, setRules] = useState<WorkflowRule[]>(initialRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<WorkflowRule | null>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setCurrentRule({ 
      id: 0, // Will be updated on save
      name: "", 
      description: "",
      trigger: "request_created", 
      condition: "", 
      action: "notify_role",
      actionTarget: "",
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (rule: WorkflowRule) => {
    setCurrentRule({ ...rule });
    setIsDialogOpen(true);
  };

  const handleSave = (rule: WorkflowRule) => {
    if (rule.id) {
      // Edit existing rule
      setRules(
        rules.map((r) =>
          r.id === rule.id ? rule : r
        )
      );
      toast({
        title: "Success",
        description: "Workflow rule updated successfully",
      });
    } else {
      // Add new rule
      const newRule = {
        ...rule,
        id: Math.max(0, ...rules.map((r) => r.id)) + 1,
      };
      setRules([...rules, newRule]);
      toast({
        title: "Success",
        description: "Workflow rule added successfully",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const toggleRuleStatus = (id: number) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  return (
    <>
      <WorkflowRulesList
        rules={rules}
        triggerOptions={triggerOptions}
        actionOptions={actionOptions}
        onAddRule={openAddDialog}
        onEditRule={openEditDialog}
        onDeleteRule={handleDelete}
        onToggleRuleStatus={toggleRuleStatus}
      />
      <WorkflowRuleDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        currentRule={currentRule}
        triggerOptions={triggerOptions}
        actionOptions={actionOptions}
      />
    </>
  );
};

export default WorkflowRules;
