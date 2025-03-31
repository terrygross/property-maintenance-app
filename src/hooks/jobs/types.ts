
/**
 * Type definitions for job-related hooks
 */

export interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  status?: string;
  assignedTo?: string; // Add assignedTo property
  accepted?: boolean;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

export interface UseAssignedJobsReturn {
  assignedJobs: Job[];
  handleJobPhotoUpdate: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  handleAcceptJob: (jobId: string) => void;
  handleUpdateJobStatus: (jobId: string, status: string) => void;
  handleUpdateJobPriority: (jobId: string, priority: string) => void;
}
