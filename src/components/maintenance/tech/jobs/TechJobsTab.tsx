
import React from "react";
import { TechJob } from "./types";
import JobsContainer from "./JobsContainer";
import JobsDialogs from "./JobsDialogs";
import { TechJobsProvider, useTechJobs } from "./TechJobsContext";
import { getPriorityColor } from "./JobUtils";

interface TechJobsTabProps {
  assignedJobs: TechJob[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  onAddComment?: (jobId: string, comment: string) => void;
  isAdmin?: boolean;
}

const TechJobsInner = () => {
  const { 
    showJobDetails, 
    setShowJobDetails, 
    showReporterImage, 
    setShowReporterImage, 
    selectedJob,
    handlePhotoCapture,
    onUpdateStatus,
    onAddComment
  } = useTechJobs();

  return (
    <>
      <JobsDialogs 
        showJobDetails={showJobDetails}
        setShowJobDetails={setShowJobDetails}
        showReporterImage={showReporterImage}
        setShowReporterImage={setShowReporterImage}
        selectedJob={selectedJob}
        getPriorityColor={getPriorityColor}
        handlePhotoCapture={handlePhotoCapture}
        handleUpdateJobStatus={onUpdateStatus}
        handleAddComment={onAddComment}
      />
    </>
  );
};

const TechJobsTab: React.FC<TechJobsTabProps> = ({ 
  assignedJobs, 
  onPhotoCapture, 
  onAcceptJob, 
  onUpdateStatus,
  onAddComment,
  isAdmin
}) => {
  return (
    <TechJobsProvider 
      assignedJobs={assignedJobs}
      onPhotoCapture={onPhotoCapture}
      onAcceptJob={onAcceptJob}
      onUpdateStatus={onUpdateStatus}
      onAddComment={onAddComment}
    >
      <div className="space-y-4">
        <JobsContainer jobs={assignedJobs} isAdmin={isAdmin} />
        <TechJobsInner />
      </div>
    </TechJobsProvider>
  );
};

export default TechJobsTab;
