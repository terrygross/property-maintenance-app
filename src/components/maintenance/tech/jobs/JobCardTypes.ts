
export interface StatusBadgeProps {
  status: string;
  isHighPriority: boolean;
  isAccepted: boolean;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  status?: string;
  pausedAt?: string;
  pausedReason?: string;
  lastReminderDate?: string;
  needsReminder?: boolean;
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

export interface JobsContextProps {
  selectedJob: Job | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<Job | null>>;
  showJobDetails: boolean;
  setShowJobDetails: React.Dispatch<React.SetStateAction<boolean>>;
  handleViewDetails: (job: Job) => void;
  handleViewReporterImage: (job: Job) => void;
  handlePhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
}

export interface PriorityDialogProps {
  showPriorityDialog: boolean;
  setShowPriorityDialog: (show: boolean) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  handlePriorityChange: () => void;
}

