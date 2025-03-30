
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import JobsList from "./JobsList";
import EmptyJobsList from "./EmptyJobsList";
import { TechJob } from "./types";
import { useTechJobs } from "./TechJobsContext";
import { getPriorityColor } from "./JobUtils";
import JobsHeader from "./JobsHeader";
import { hasAdminAccess } from "@/types/user";
import { useAppState } from "@/context/AppStateContext";

interface JobsContainerProps {
  jobs: TechJob[];
  isAdmin?: boolean;
}

const JobsContainer: React.FC<JobsContainerProps> = ({ jobs, isAdmin = false }) => {
  const { 
    handleViewDetails, 
    handleViewReporterImage, 
    onAcceptJob, 
    onUpdateStatus 
  } = useTechJobs();
  const { currentUser } = useAppState();
  
  // Determine if the current user has admin access
  const hasAdmin = currentUser ? hasAdminAccess(currentUser.role) : isAdmin;

  return (
    <Card>
      <JobsHeader jobCount={jobs.length} isAdmin={hasAdmin} />
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
