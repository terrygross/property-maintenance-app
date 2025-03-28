
import { WorkflowRule } from "./types";

export const initialRules: WorkflowRule[] = [
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

export const triggerOptions = [
  { value: "request_created", label: "Maintenance Request Created" },
  { value: "request_updated", label: "Maintenance Request Updated" },
  { value: "task_assigned", label: "Task Assigned" },
  { value: "task_overdue", label: "Task Overdue" },
  { value: "feedback_received", label: "Feedback Received" },
];

export const actionOptions = [
  { value: "notify_role", label: "Notify Role" },
  { value: "notify_user", label: "Notify User" },
  { value: "escalate", label: "Escalate Request" },
  { value: "create_follow_up", label: "Create Follow-up Task" },
  { value: "change_status", label: "Change Request Status" },
];
