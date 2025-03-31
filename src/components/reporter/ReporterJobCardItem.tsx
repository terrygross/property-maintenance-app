
import React from "react";
import JobCard from "../job/JobCard";
import JobPhotosViewer from "../jobs/JobPhotosViewer";
import { JobCardProps } from "../job/jobCardTypes";

interface ReporterJobCardItemProps {
  job: JobCardProps;
  onAssign: (jobId: string, technicianId: string, priority: string) => void;
  onResendEmail: (jobId: string, technicianId: string) => void;
  onAcceptJob: (jobId: string) => void;
}

const ReporterJobCardItem = ({ 
  job, 
  onAssign, 
  onResendEmail, 
  onAcceptJob 
}: ReporterJobCardItemProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <JobCard
        {...job}
        onAssign={onAssign}
        onResendEmail={onResendEmail}
        onAcceptJob={job.status === "assigned" ? onAcceptJob : undefined}
      />
      <JobPhotosViewer reporterPhoto={job.reporterPhoto} />
    </div>
  );
};

export default ReporterJobCardItem;
