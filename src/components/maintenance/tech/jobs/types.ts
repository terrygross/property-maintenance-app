
export interface TechJob {
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

export interface TechJobsHandlers {
  onViewDetails: (job: TechJob) => void;
  onViewReporterImage: (job: TechJob) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  onAddComment?: (jobId: string, comment: string) => void;
}
