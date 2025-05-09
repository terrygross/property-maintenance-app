
import React from "react";
import JobDetailsDialog from "./JobDetailsDialog";
import ReporterImageDialog from "./ReporterImageDialog";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  status?: string;
  comments?: string[];
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface JobsDialogsProps {
  showJobDetails: boolean;
  setShowJobDetails: (show: boolean) => void;
  showReporterImage: boolean;
  setShowReporterImage: (show: boolean) => void;
  selectedJob: Job | null;
  getPriorityColor: (priority: string) => string;
  handlePhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  handleUpdateJobStatus?: (jobId: string, status: string) => void;
  handleAddComment?: (jobId: string, comment: string) => void;
}

const JobsDialogs: React.FC<JobsDialogsProps> = ({
  showJobDetails,
  setShowJobDetails,
  showReporterImage,
  setShowReporterImage,
  selectedJob,
  getPriorityColor,
  handlePhotoCapture,
  handleUpdateJobStatus,
  handleAddComment
}) => {
  return (
    <>
      <JobDetailsDialog 
        showJobDetails={showJobDetails}
        setShowJobDetails={setShowJobDetails}
        selectedJob={selectedJob}
        getPriorityColor={getPriorityColor}
        handlePhotoCapture={handlePhotoCapture}
        handleUpdateJobStatus={handleUpdateJobStatus}
        handleAddComment={handleAddComment}
      />

      <ReporterImageDialog 
        showReporterImage={showReporterImage}
        setShowReporterImage={setShowReporterImage}
        selectedJob={selectedJob}
      />
    </>
  );
};

export default JobsDialogs;
