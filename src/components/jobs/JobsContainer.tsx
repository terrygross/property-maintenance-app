
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobItem from "./JobItem";
import { Job } from "./jobsListUtils";

interface JobsContainerProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onMarkComplete?: (jobId: string) => void;
}

const JobsContainer = ({ jobs, onViewDetails, onMarkComplete }: JobsContainerProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">
          {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No jobs found in this category
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobItem 
                key={job.id} 
                job={job} 
                onViewDetails={onViewDetails}
                onMarkComplete={onMarkComplete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobsContainer;
