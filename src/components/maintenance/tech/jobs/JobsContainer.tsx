
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import JobsList from "./JobsList";
import EmptyJobsList from "./EmptyJobsList";
import { TechJob } from "./types";
import { useTechJobs } from "./TechJobsContext";
import { getPriorityColor } from "./JobUtils";
import JobsHeader from "./JobsHeader";

interface JobsContainerProps {
  jobs: TechJob[];
}

const JobsContainer: React.FC<JobsContainerProps> = ({ jobs }) => {
  const { 
    handleViewDetails, 
    handleViewReporterImage, 
    onAcceptJob, 
    onUpdateStatus 
  } = useTechJobs();

  return (
    <Card>
      <JobsHeader />
      <CardContent>
        {jobs.length === 0 ? (
          <EmptyJobsList />
        ) : (
          <JobsList 
            jobs={jobs}
            onViewDetails={handleViewDetails}
            onViewReporterImage={handleViewReporterImage}
            onAcceptJob={onAcceptJob}
            onUpdateStatus={onUpdateStatus}
            getPriorityColor={getPriorityColor}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default JobsContainer;
