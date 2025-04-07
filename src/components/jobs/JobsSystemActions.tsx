
import React from "react";
import ExportJobsButton from "./actions/ExportJobsButton";
import ImportJobsButton from "./actions/ImportJobsButton";
import ClearStorageButton from "@/components/admin/ClearStorageButton";
import SystemActionsInfo from "./actions/SystemActionsInfo";
import { Job } from "./jobsListUtils";

interface JobsSystemActionsProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobsSystemActions = ({ jobs, setJobs }: JobsSystemActionsProps) => {
  const handleImportJobs = (importedJobs: Job[]) => {
    setJobs(prevJobs => {
      const filteredJobs = prevJobs.filter(job => 
        !importedJobs.some(importedJob => importedJob.id === job.id)
      );
      
      return [...filteredJobs, ...importedJobs];
    });
  };
  
  const handleClearStorage = () => {
    setJobs([]);
  };
  
  return (
    <div className="mb-4 p-4 border rounded-md bg-muted/20">
      <h3 className="text-sm font-medium mb-2">System Actions</h3>
      <div className="flex flex-wrap gap-2">
        <ExportJobsButton jobs={jobs} />
        <ImportJobsButton onImport={handleImportJobs} />
        <ClearStorageButton onClear={handleClearStorage} />
      </div>
      <SystemActionsInfo />
    </div>
  );
};

export default JobsSystemActions;
