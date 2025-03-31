
import React from "react";
import { NotificationSettings } from "@/hooks/settings/useSystemSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface NotificationSettingsTabProps {
  settings: NotificationSettings;
  updateSettings: (values: Partial<NotificationSettings>) => void;
}

const roles = [
  { id: "admin", name: "Administrator" },
  { id: "maintenance_manager", name: "Maintenance Manager" },
  { id: "maintenance_tech", name: "Maintenance Technician" },
  { id: "contractor", name: "Contractor" },
  { id: "reporter", name: "Reporter" },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const NotificationSettingsTab = ({ settings, updateSettings }: NotificationSettingsTabProps) => {
  const handleAlertThresholdChange = (field: keyof NotificationSettings['alertThresholds'], value: string) => {
    updateSettings({
      alertThresholds: {
        ...settings.alertThresholds,
        [field]: parseInt(value) || 0
      }
    });
  };

  const handleReminderFrequencyChange = (field: keyof NotificationSettings['reminderFrequency'], value: string) => {
    updateSettings({
      reminderFrequency: {
        ...settings.reminderFrequency,
        [field]: parseInt(value) || 0
      }
    });
  };

  const handleNotificationScheduleChange = (field: keyof NotificationSettings['notificationSchedule'], value: boolean | string) => {
    updateSettings({
      notificationSchedule: {
        ...settings.notificationSchedule,
        [field]: value
      }
    });
  };

  const handleDayOfWeekToggle = (day: string) => {
    const currentDays = settings.notificationSchedule.daysOfWeek;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    handleNotificationScheduleChange("daysOfWeek", newDays);
  };

  const addEscalationPath = () => {
    const newId = `escalation-${Date.now()}`;
    updateSettings({
      escalationPaths: [
        ...settings.escalationPaths,
        {
          id: newId,
          name: "New Escalation Path",
          levels: [
            { roleId: "maintenance_tech", delayMinutes: 0 },
            { roleId: "maintenance_manager", delayMinutes: 60 },
          ]
        }
      ]
    });
  };

  const removeEscalationPath = (index: number) => {
    updateSettings({
      escalationPaths: settings.escalationPaths.filter((_, i) => i !== index)
    });
  };

  const updateEscalationPathName = (index: number, name: string) => {
    const newPaths = [...settings.escalationPaths];
    newPaths[index] = { ...newPaths[index], name };
    updateSettings({ escalationPaths: newPaths });
  };

  const addEscalationLevel = (pathIndex: number) => {
    const newPaths = [...settings.escalationPaths];
    newPaths[pathIndex].levels.push({ roleId: "admin", delayMinutes: 120 });
    updateSettings({ escalationPaths: newPaths });
  };

  const removeEscalationLevel = (pathIndex: number, levelIndex: number) => {
    const newPaths = [...settings.escalationPaths];
    newPaths[pathIndex].levels = newPaths[pathIndex].levels.filter((_, i) => i !== levelIndex);
    updateSettings({ escalationPaths: newPaths });
  };

  const updateEscalationLevel = (pathIndex: number, levelIndex: number, field: keyof (typeof settings.escalationPaths)[0]['levels'][0], value: string) => {
    const newPaths = [...settings.escalationPaths];
    newPaths[pathIndex].levels[levelIndex] = {
      ...newPaths[pathIndex].levels[levelIndex],
      [field]: field === 'delayMinutes' ? parseInt(value) || 0 : value
    };
    updateSettings({ escalationPaths: newPaths });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Alert Thresholds</h3>
        <p className="text-sm text-muted-foreground">
          Set thresholds for system-wide alerts
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="criticalJobs">Critical Jobs</Label>
          <Input
            id="criticalJobs"
            type="number"
            min="0"
            value={settings.alertThresholds.criticalJobs}
            onChange={(e) => handleAlertThresholdChange("criticalJobs", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Alert when critical jobs reach this number
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="highPriorityJobs">High Priority Jobs</Label>
          <Input
            id="highPriorityJobs"
            type="number"
            min="0"
            value={settings.alertThresholds.highPriorityJobs}
            onChange={(e) => handleAlertThresholdChange("highPriorityJobs", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Alert when high priority jobs reach this number
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pendingApprovals">Pending Approvals</Label>
          <Input
            id="pendingApprovals"
            type="number"
            min="0"
            value={settings.alertThresholds.pendingApprovals}
            onChange={(e) => handleAlertThresholdChange("pendingApprovals", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Alert when pending approvals reach this number
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Escalation Paths</h3>
        <p className="text-sm text-muted-foreground">
          Define escalation paths for unresolved issues
        </p>
      </div>
      
      <Separator />
      
      {settings.escalationPaths.map((path, pathIndex) => (
        <div key={path.id} className="mb-8 border rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <Label htmlFor={`path-name-${pathIndex}`}>Path Name</Label>
              <Input
                id={`path-name-${pathIndex}`}
                value={path.name}
                onChange={(e) => updateEscalationPathName(pathIndex, e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEscalationPath(pathIndex)}
              disabled={settings.escalationPaths.length <= 1}
              className="text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Remove Path
            </Button>
          </div>
          
          <h4 className="text-sm font-medium mb-2">Escalation Levels</h4>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Delay (Minutes)</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {path.levels.map((level, levelIndex) => (
                <TableRow key={levelIndex}>
                  <TableCell>
                    <Select
                      value={level.roleId}
                      onValueChange={(value) => updateEscalationLevel(pathIndex, levelIndex, "roleId", value)}
                    >
                      <SelectTrigger id={`role-${pathIndex}-${levelIndex}`} className="w-[200px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      value={level.delayMinutes}
                      onChange={(e) => updateEscalationLevel(pathIndex, levelIndex, "delayMinutes", e.target.value)}
                      className="w-[120px]"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEscalationLevel(pathIndex, levelIndex)}
                      disabled={path.levels.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Button variant="outline" size="sm" onClick={() => addEscalationLevel(pathIndex)} className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Level
          </Button>
        </div>
      ))}
      
      <Button variant="outline" onClick={addEscalationPath}>
        <Plus className="h-4 w-4 mr-2" />
        Add Escalation Path
      </Button>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Notification Schedule</h3>
        <p className="text-sm text-muted-foreground">
          Set when notifications can be sent
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="notificationsEnabled"
            checked={settings.notificationSchedule.enabled}
            onCheckedChange={(value) => handleNotificationScheduleChange("enabled", value)}
          />
          <Label htmlFor="notificationsEnabled">Enable Notification Schedule</Label>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={settings.notificationSchedule.startTime}
              onChange={(e) => handleNotificationScheduleChange("startTime", e.target.value)}
              disabled={!settings.notificationSchedule.enabled}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={settings.notificationSchedule.endTime}
              onChange={(e) => handleNotificationScheduleChange("endTime", e.target.value)}
              disabled={!settings.notificationSchedule.enabled}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Days of Week</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox
                  id={`day-${day}`}
                  checked={settings.notificationSchedule.daysOfWeek.includes(day)}
                  onCheckedChange={() => handleDayOfWeekToggle(day)}
                  disabled={!settings.notificationSchedule.enabled}
                />
                <Label htmlFor={`day-${day}`}>{day}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Reminder Frequency</h3>
        <p className="text-sm text-muted-foreground">
          Set how often reminders are sent (in hours)
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pendingReminder">Pending Jobs</Label>
          <Input
            id="pendingReminder"
            type="number"
            min="0"
            value={settings.reminderFrequency.pending}
            onChange={(e) => handleReminderFrequencyChange("pending", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Hours between reminders for pending jobs
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="inProgressReminder">In Progress Jobs</Label>
          <Input
            id="inProgressReminder"
            type="number"
            min="0"
            value={settings.reminderFrequency.inProgress}
            onChange={(e) => handleReminderFrequencyChange("inProgress", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Hours between reminders for in-progress jobs
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="overdueReminder">Overdue Jobs</Label>
          <Input
            id="overdueReminder"
            type="number"
            min="0"
            value={settings.reminderFrequency.overdue}
            onChange={(e) => handleReminderFrequencyChange("overdue", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Hours between reminders for overdue jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsTab;
