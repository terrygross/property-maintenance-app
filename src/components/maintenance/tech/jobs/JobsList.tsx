
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
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
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
