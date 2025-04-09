
export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  property: string;
  reportDate: string;
  priority: "low" | "medium" | "high";
  status: "unassigned" | "assigned" | "in_progress" | "completed";
  assignedTo?: string;
  emailSent?: boolean;
  reporterPhoto?: string;
  highPriority?: boolean; // Add highPriority flag
  notificationSent?: boolean; // Add notificationSent flag
  onAssign?: (id: string, technicianId: string, priority: string) => void;
  onResendEmail?: (id: string, technicianId: string) => void;
  onAcceptJob?: (id: string) => void;
}
