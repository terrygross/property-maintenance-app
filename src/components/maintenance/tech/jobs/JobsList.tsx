
import React from "react";
import JobCard from "./JobCard";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
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
  getPriorityColor: (priority: string) => string;
}

const JobsList = ({ jobs, onViewDetails, onViewReporterImage, getPriorityColor }: JobsListProps) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard 
          key={job.id}
          job={job} 
          onViewDetails={onViewDetails}
          onViewReporterImage={onViewReporterImage}
          getPriorityColor={getPriorityColor}
        />
      ))}
    </div>
  );
};

export default JobsList;
