
import React from "react";
import JobCard from "./JobCard";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
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
  getPriorityColor: (priority: string) => string;
}

const JobsList = ({ 
  jobs, 
  onViewDetails, 
  onViewReporterImage, 
  onAcceptJob,
  getPriorityColor 
}: JobsListProps) => {
  // Sort jobs to show high priority jobs at the top
  const sortedJobs = [...jobs].sort((a, b) => {
    // First by priority (high > medium > low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = 
      (priorityOrder[a.priority as keyof typeof priorityOrder] || 3) - 
      (priorityOrder[b.priority as keyof typeof priorityOrder] || 3);
    
    if (priorityDiff !== 0) return priorityDiff;
    
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
          getPriorityColor={getPriorityColor}
        />
      ))}
    </div>
  );
};

export default JobsList;
