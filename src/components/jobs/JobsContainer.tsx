
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobItem from "./JobItem";
import { Job } from "./jobsListUtils";

interface JobsContainerProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onMarkComplete?: (jobId: string) => void;
  isAdmin?: boolean;
}

const JobsContainer: React.FC<JobsContainerProps> = ({ 
  jobs, 
  onViewDetails, 
  onMarkComplete,
  isAdmin = false
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No jobs found
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobItem
                key={job.id}
                job={job}
                onViewDetails={() => onViewDetails(job)}
                onMarkComplete={onMarkComplete ? () => onMarkComplete(job.id) : undefined}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobsContainer;
