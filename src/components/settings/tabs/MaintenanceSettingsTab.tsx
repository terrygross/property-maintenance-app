
import React from "react";
import { MaintenanceSettings } from "@/hooks/settings/useSystemSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, X, GripHorizontal } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface MaintenanceSettingsTabProps {
  settings: MaintenanceSettings;
  updateSettings: (values: Partial<MaintenanceSettings>) => void;
}

const MaintenanceSettingsTab = ({ settings, updateSettings }: MaintenanceSettingsTabProps) => {
  const handleSlaChange = (field: keyof Pick<MaintenanceSettings, 'defaultSlaCritical' | 'defaultSlaHigh' | 'defaultSlaMedium' | 'defaultSlaLow'>, value: string) => {
    updateSettings({ [field]: parseInt(value) || 0 });
  };

  const handlePriorityChange = (index: number, field: keyof MaintenanceSettings['priorityLevels'][0], value: string) => {
    const newPriorities = [...settings.priorityLevels];
    newPriorities[index] = { ...newPriorities[index], [field]: value };
    updateSettings({ priorityLevels: newPriorities });
  };

  const handleStatusChange = (index: number, field: keyof MaintenanceSettings['statusCategories'][0], value: string) => {
    const newStatuses = [...settings.statusCategories];
    newStatuses[index] = { ...newStatuses[index], [field]: value };
    updateSettings({ statusCategories: newStatuses });
  };

  const handleWorkflowChange = (index: number, field: keyof MaintenanceSettings['workflowSteps'][0], value: string | number) => {
    const newWorkflows = [...settings.workflowSteps];
    newWorkflows[index] = { ...newWorkflows[index], [field]: field === 'order' ? Number(value) : value };
    updateSettings({ workflowSteps: newWorkflows });
  };

  const addPriority = () => {
    const newId = `priority-${Date.now()}`;
    updateSettings({
      priorityLevels: [...settings.priorityLevels, { id: newId, name: "New Priority", color: "#CCCCCC" }]
    });
  };

  const removePriority = (index: number) => {
    updateSettings({
      priorityLevels: settings.priorityLevels.filter((_, i) => i !== index)
    });
  };

  const addStatus = () => {
    const newId = `status-${Date.now()}`;
    updateSettings({
      statusCategories: [...settings.statusCategories, { id: newId, name: "New Status", color: "#CCCCCC" }]
    });
  };

  const removeStatus = (index: number) => {
    updateSettings({
      statusCategories: settings.statusCategories.filter((_, i) => i !== index)
    });
  };

  const addWorkflowStep = () => {
    const newId = `step-${Date.now()}`;
    const maxOrder = Math.max(...settings.workflowSteps.map(step => step.order), 0);
    updateSettings({
      workflowSteps: [...settings.workflowSteps, { id: newId, name: "New Step", order: maxOrder + 1 }]
    });
  };

  const removeWorkflowStep = (index: number) => {
    updateSettings({
      workflowSteps: settings.workflowSteps.filter((_, i) => i !== index)
    });
  };

  // Sort workflow steps by order
  const sortedWorkflowSteps = [...settings.workflowSteps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">SLA Timeframes</h3>
        <p className="text-sm text-muted-foreground">
          Configure default response times (in hours) for different priority levels
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slaCritical">Critical Priority (Hours)</Label>
          <Input
            id="slaCritical"
            type="number"
            min="1"
            value={settings.defaultSlaCritical}
            onChange={(e) => handleSlaChange("defaultSlaCritical", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slaHigh">High Priority (Hours)</Label>
          <Input
            id="slaHigh"
            type="number"
            min="1"
            value={settings.defaultSlaHigh}
            onChange={(e) => handleSlaChange("defaultSlaHigh", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slaMedium">Medium Priority (Hours)</Label>
          <Input
            id="slaMedium"
            type="number"
            min="1"
            value={settings.defaultSlaMedium}
            onChange={(e) => handleSlaChange("defaultSlaMedium", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slaLow">Low Priority (Hours)</Label>
          <Input
            id="slaLow"
            type="number"
            min="1"
            value={settings.defaultSlaLow}
            onChange={(e) => handleSlaChange("defaultSlaLow", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Priority Levels</h3>
        <p className="text-sm text-muted-foreground">
          Define priority levels and their colors
        </p>
      </div>
      
      <Separator />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings.priorityLevels.map((priority, index) => (
            <TableRow key={priority.id}>
              <TableCell className="font-medium">
                <Input
                  value={priority.id}
                  onChange={(e) => handlePriorityChange(index, "id", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={priority.name}
                  onChange={(e) => handlePriorityChange(index, "name", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={priority.color}
                    onChange={(e) => handlePriorityChange(index, "color", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={priority.color}
                    onChange={(e) => handlePriorityChange(index, "color", e.target.value)}
                    className="w-24"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removePriority(index)}
                  disabled={settings.priorityLevels.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Button variant="outline" size="sm" onClick={addPriority} className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Priority
      </Button>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Status Categories</h3>
        <p className="text-sm text-muted-foreground">
          Define job status categories and their colors
        </p>
      </div>
      
      <Separator />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings.statusCategories.map((status, index) => (
            <TableRow key={status.id}>
              <TableCell className="font-medium">
                <Input
                  value={status.id}
                  onChange={(e) => handleStatusChange(index, "id", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={status.name}
                  onChange={(e) => handleStatusChange(index, "name", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={status.color}
                    onChange={(e) => handleStatusChange(index, "color", e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={status.color}
                    onChange={(e) => handleStatusChange(index, "color", e.target.value)}
                    className="w-24"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeStatus(index)}
                  disabled={settings.statusCategories.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Button variant="outline" size="sm" onClick={addStatus} className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Status
      </Button>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Workflow Steps</h3>
        <p className="text-sm text-muted-foreground">
          Define maintenance workflow steps and their order
        </p>
      </div>
      
      <Separator />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Order</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedWorkflowSteps.map((step, index) => (
            <TableRow key={step.id}>
              <TableCell>
                <div className="flex items-center">
                  <GripHorizontal className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input
                    type="number"
                    min="1"
                    value={step.order}
                    onChange={(e) => handleWorkflowChange(index, "order", e.target.value)}
                    className="w-14"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <Input
                  value={step.id}
                  onChange={(e) => handleWorkflowChange(index, "id", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={step.name}
                  onChange={(e) => handleWorkflowChange(index, "name", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeWorkflowStep(index)}
                  disabled={settings.workflowSteps.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Button variant="outline" size="sm" onClick={addWorkflowStep} className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Workflow Step
      </Button>
    </div>
  );
};

export default MaintenanceSettingsTab;
