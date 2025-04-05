
export interface HighPriorityJob {
  id: string;
  title: string;
  location: string;
  priority: string;
  status: string;
  assignedTo: string;
  dueDate: Date;
  accepted: boolean;
  alertShown: boolean;
  photos: {
    before: string;
    after: string;
    reporter: string;
  };
}

export interface UseHighPriorityJobsReturn {
  highPriorityJobs: HighPriorityJob[];
}
