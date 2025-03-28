
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data
const initialRules = [
  { 
    id: 1, 
    name: "Emergency Escalation", 
    description: "Escalate emergency requests to manager",
    trigger: "request_created", 
    condition: "priority == 'High'", 
    action: "notify_role",
    actionTarget: "maintenance_manager",
    isActive: true
  },
  { 
    id: 2, 
    name: "Overdue Tasks", 
    description: "Notify manager about overdue tasks",
    trigger: "task_overdue", 
    condition: "days_overdue > 2", 
    action: "notify_role",
    actionTarget: "maintenance_manager",
    isActive: true
  },
  { 
    id: 3, 
    name: "Tenant Feedback", 
    description: "Alert on negative feedback",
    trigger: "feedback_received", 
    condition: "rating < 3", 
    action: "create_follow_up",
    actionTarget: "",
    isActive: false
  },
];

const WorkflowRules = () => {
  const [rules, setRules] = useState(initialRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<any>(null);
  const { toast } = useToast();

  const triggerOptions = [
    { value: "request_created", label: "Maintenance Request Created" },
    { value: "request_updated", label: "Maintenance Request Updated" },
    { value: "task_assigned", label: "Task Assigned" },
    { value: "task_overdue", label: "Task Overdue" },
    { value: "feedback_received", label: "Feedback Received" },
  ];

  const actionOptions = [
    { value: "notify_role", label: "Notify Role" },
    { value: "notify_user", label: "Notify User" },
    { value: "escalate", label: "Escalate Request" },
    { value: "create_follow_up", label: "Create Follow-up Task" },
    { value: "change_status", label: "Change Request Status" },
  ];

  const openAddDialog = () => {
    setCurrentRule({ 
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

  const openEditDialog = (rule: any) => {
    setCurrentRule({ ...rule });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentRule.name.trim()) {
      toast({
        title: "Error",
        description: "Rule name is required",
        variant: "destructive",
      });
      return;
    }

    if (currentRule.id) {
      // Edit existing rule
      setRules(
        rules.map((r) =>
          r.id === currentRule.id ? currentRule : r
        )
      );
      toast({
        title: "Success",
        description: "Workflow rule updated successfully",
      });
    } else {
      // Add new rule
      const newRule = {
        ...currentRule,
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
    if (confirm("Are you sure you want to delete this workflow rule?")) {
      setRules(rules.filter((r) => r.id !== id));
      toast({
        title: "Success",
        description: "Workflow rule deleted successfully",
      });
    }
  };

  const toggleRuleStatus = (id: number) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Workflow Rules</h2>
        <Button onClick={openAddDialog}>
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
                    onCheckedChange={() => toggleRuleStatus(rule.id)}
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
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(rule)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(rule.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentRule?.id ? "Edit Workflow Rule" : "Add Workflow Rule"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentRule?.name || ""}
                onChange={(e) =>
                  setCurrentRule({ ...currentRule, name: e.target.value })
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={currentRule?.description || ""}
                onChange={(e) =>
                  setCurrentRule({ ...currentRule, description: e.target.value })
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trigger">Trigger Event</Label>
              <Select
                value={currentRule?.trigger || "request_created"}
                onValueChange={(value) =>
                  setCurrentRule({ ...currentRule, trigger: value })
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
                value={currentRule?.condition || ""}
                onChange={(e) =>
                  setCurrentRule({ ...currentRule, condition: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Simple conditions like &quot;priority == &apos;High&apos;&quot; or &quot;days_overdue &gt; 2&quot;
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select
                value={currentRule?.action || "notify_role"}
                onValueChange={(value) =>
                  setCurrentRule({ ...currentRule, action: value })
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
            
            {(currentRule?.action === "notify_role" || currentRule?.action === "notify_user") && (
              <div className="space-y-2">
                <Label htmlFor="actionTarget">Target {currentRule?.action === "notify_role" ? "Role" : "User"}</Label>
                <Input
                  id="actionTarget"
                  placeholder={currentRule?.action === "notify_role" ? "e.g. maintenance_manager" : "User ID or email"}
                  value={currentRule?.actionTarget || ""}
                  onChange={(e) =>
                    setCurrentRule({ ...currentRule, actionTarget: e.target.value })
                  }
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isActive"
                checked={currentRule?.isActive || false}
                onCheckedChange={(checked) =>
                  setCurrentRule({ ...currentRule, isActive: !!checked })
                }
              />
              <Label htmlFor="isActive">Rule is active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowRules;
