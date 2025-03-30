
import React from "react";
import JobCard from "./JobCard";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  status?: string;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface JobsListProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onViewReporterImage: (job: Job) => void;
  onAcceptJob: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: string) => void;
  getPriorityColor: (priority: string) => string;
}

const JobsList = ({ 
  jobs, 
  onViewDetails, 
  onViewReporterImage, 
  onAcceptJob,
  onUpdateStatus,
  getPriorityColor 
}: JobsListProps) => {
  // Sort jobs to show high priority jobs at the top, then in-progress jobs, then assigned
  const sortedJobs = [...jobs].sort((a, b) => {
    // First by priority (high > medium > low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = 
      (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) - 
      (priorityOrder[b.priority as keyof typeof priorityOrder] || 3);
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by status (unaccepted > in_progress > assigned > completed)
    const statusOrder = { assigned: 1, in_progress: 0, completed: 2 };
    const aStatus = a.status || "assigned";
    const bStatus = b.status || "assigned";
    
    const statusDiff = 
      (statusOrder[aStatus as keyof typeof statusOrder] || 1) - 
      (statusOrder[bStatus as keyof typeof statusOrder] || 1);
    
    if (statusDiff !== 0) return statusDiff;
    
    // Then by acceptance status (unaccepted first)
    if (a.accepted !== b.accepted) {
      return a.accepted ? 1 : -1;
    }
    
    // Then by due date (earliest first)
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  return (
    <div className="space-y-4">
      {sortedJobs.map((job) => (
        <JobCard 
          key={job.id}
          job={job} 
          onViewDetails={onViewDetails}
          onViewReporterImage={onViewReporterImage}
          onAcceptJob={onAcceptJob}
          onUpdateStatus={onUpdateStatus}
          getPriorityColor={getPriorityColor}
        />
      ))}
    </div>
  );
};

export default JobsList;
