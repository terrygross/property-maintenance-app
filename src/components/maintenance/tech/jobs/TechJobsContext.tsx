
import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TechJob } from "./types";
import { updateLocalStorageJobs } from "./JobUtils";

interface TechJobsContextProps {
  selectedJob: TechJob | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<TechJob | null>>;
  showJobDetails: boolean;
  setShowJobDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showReporterImage: boolean;
  setShowReporterImage: React.Dispatch<React.SetStateAction<boolean>>;
  handleViewDetails: (job: TechJob) => void;
  handleViewReporterImage: (job: TechJob) => void;
  handlePhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
}

const TechJobsContext = createContext<TechJobsContextProps | undefined>(undefined);

export const TechJobsProvider: React.FC<{
  children: React.ReactNode;
  assignedJobs: TechJob[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
}> = ({ children, assignedJobs, onPhotoCapture, onAcceptJob, onUpdateStatus }) => {
  const [selectedJob, setSelectedJob] = useState<TechJob | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showReporterImage, setShowReporterImage] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (job: TechJob) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleViewReporterImage = (job: TechJob) => {
    setSelectedJob(job);
    setShowReporterImage(true);
  };

  const handlePhotoCapture = (jobId: string, type: "before" | "after", imageUrl: string) => {
    onPhotoCapture(jobId, type, imageUrl);
    
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({
        ...selectedJob,
        photos: {
          ...selectedJob.photos,
          [type]: imageUrl
        }
      });
    }
    
    updateLocalStorageJobs(jobId, type, imageUrl);
    
    // If this is an after photo and job is in_progress, let user know they can now complete the job
    if (type === "after" && selectedJob?.status === "in_progress") {
      toast({
        title: "After photo added",
        description: "You can now mark this job as complete.",
        variant: "default",
      });
    }
  };

  return (
    <TechJobsContext.Provider value={{
      selectedJob,
      setSelectedJob,
      showJobDetails,
      setShowJobDetails,
      showReporterImage,
      setShowReporterImage,
      handleViewDetails,
      handleViewReporterImage,
      handlePhotoCapture,
      onPhotoCapture,
      onAcceptJob,
      onUpdateStatus
    }}>
      {children}
    </TechJobsContext.Provider>
  );
};

export const useTechJobs = () => {
  const context = useContext(TechJobsContext);
  if (context === undefined) {
    throw new Error("useTechJobs must be used within a TechJobsProvider");
  }
  return context;
};
