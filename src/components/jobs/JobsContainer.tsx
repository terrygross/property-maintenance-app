
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobItem from "./JobItem";
import { Job } from "./jobsListUtils";

interface JobsContainerProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
  onMarkComplete?: (jobId: string) => void;
}

const JobsContainer: React.FC<JobsContainerProps> = ({ 
  jobs, 
  onViewDetails,
  onMarkComplete
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobItem 
                key={job.id} 
                job={job} 
                onViewDetails={onViewDetails}
                onMarkComplete={onMarkComplete}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No assigned jobs yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsContainer;
