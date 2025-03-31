import React from "react";
import { useAppState } from "@/context/AppStateContext";
import { TechJob } from "./types";
import { TechJobsProvider, useTechJobs } from "./TechJobsContext";
import JobsContainer from "./JobsContainer";
import JobsDialogs from "./JobsDialogs";
import { getPriorityColor } from "./JobUtils";

interface TechJobsTabProps {
  assignedJobs: TechJob[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  isAdmin?: boolean;
}

const TechJobsTab: React.FC<TechJobsTabProps> = ({ 
  assignedJobs, 
  onPhotoCapture, 
  onAcceptJob, 
  onUpdateStatus,
  isAdmin = false
}) => {
  const { properties } = useAppState();

  // Map job locations to actual property names if needed
  const updatedJobs = assignedJobs.map(job => {
    // Check if the job location matches any known property
    const matchingProperty = properties.find(p => p.name === job.location);
    
    // If no matching property, try to find an active property to use instead
    if (!matchingProperty) {
      // For generic building references, map to an actual property
      if (job.location.includes("Building") || job.location === "Main Building") {
        const activeProperty = properties.find(p => p.status === "active");
        if (activeProperty) {
          return {
            ...job,
            location: activeProperty.name
          };
        }
      }
    }
    
    // Return original job if we couldn't or didn't need to remap
    return job;
  });

  return (
    <TechJobsProvider 
      assignedJobs={updatedJobs} 
      onPhotoCapture={onPhotoCapture}
      onAcceptJob={onAcceptJob}
      onUpdateStatus={onUpdateStatus}
    >
      <JobsContainer jobs={updatedJobs} isAdmin={isAdmin} />
      <JobsDialogsContainer />
    </TechJobsProvider>
  );
};

// Separate component for the dialogs to keep the main component cleaner
const JobsDialogsContainer: React.FC = () => {
  const { 
    showJobDetails, 
    setShowJobDetails, 
    showReporterImage, 
    setShowReporterImage, 
    selectedJob, 
    handlePhotoCapture 
  } = useTechJobs();

  return (
    <JobsDialogs 
      showJobDetails={showJobDetails}
      setShowJobDetails={setShowJobDetails}
      showReporterImage={showReporterImage}
      setShowReporterImage={setShowReporterImage}
      selectedJob={selectedJob}
      getPriorityColor={getPriorityColor}
      handlePhotoCapture={handlePhotoCapture}
    />
  );
};

export default TechJobsTab;
