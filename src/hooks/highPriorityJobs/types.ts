
/**
 * Type definitions for high-priority job-related hooks
 */

export interface HighPriorityJob {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  status: string;
  assignedTo: string;
  accepted?: boolean;
  alertShown?: boolean;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

export interface UseHighPriorityJobsReturn {
  highPriorityJobs: HighPriorityJob[];
}

