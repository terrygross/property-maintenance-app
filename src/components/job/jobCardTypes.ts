
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
  onAssign?: (id: string, technicianId: string) => void;
  onResendEmail?: (id: string, technicianId: string) => void;
}
