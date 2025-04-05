
import { LucideIcon } from "lucide-react";

export interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  status?: string;
  comments?: string[];
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

export interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onViewReporterImage: (job: Job) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  onUpdatePriority?: (jobId: string, priority: string) => void;
  getPriorityColor: (priority: string) => string;
  isAdmin?: boolean;
}

export interface StatusBadgeProps {
  status: string;
  isHighPriority: boolean;
  isAccepted: boolean;
}

export interface PriorityDialogProps {
  showPriorityDialog: boolean;
  setShowPriorityDialog: (show: boolean) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  handlePriorityChange: () => void;
}
