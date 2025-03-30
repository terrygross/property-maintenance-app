import React from "react";
import { useAppState } from "@/context/AppStateContext";
import { TechJob } from "./types";
import { TechJobsProvider } from "./TechJobsContext";
import JobsContainer from "./JobsContainer";
import JobsDialogs from "./JobsDialogs";
import { getPriorityColor } from "./JobUtils";

interface TechJobsTabProps {
  assignedJobs: TechJob[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
}

const TechJobsTab: React.FC<TechJobsTabProps> = ({ 
  assignedJobs, 
  onPhotoCapture, 
  onAcceptJob, 
  onUpdateStatus 
}) => {
  const { properties } = useAppState();

  // Map generic building names to actual property names
  const updatedJobs = assignedJobs.map(job => {
    let propertyName = job.location;
    
    // Find matching property name if location is a generic building name
    if (job.location.includes("Building") || job.location === "Main Building") {
      const property = properties.find(p => p.status === "active");
      if (property) {
        propertyName = property.name;
      }
    }
    
    return {
      ...job,
      location: propertyName
    };
  });

  return (
    <TechJobsProvider 
      assignedJobs={updatedJobs} 
      onPhotoCapture={onPhotoCapture}
      onAcceptJob={onAcceptJob}
      onUpdateStatus={onUpdateStatus}
    >
      <JobsContainer jobs={updatedJobs} />
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
