
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TechJob } from "./types";
import { updateLocalStorageJobs, getJobPhotos } from "./utils/photoUtils";

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
  onAddComment?: (jobId: string, comment: string) => void;
}

const TechJobsContext = createContext<TechJobsContextProps | undefined>(undefined);

export const TechJobsProvider: React.FC<{
  children: React.ReactNode;
  assignedJobs: TechJob[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  onAddComment?: (jobId: string, comment: string) => void;
}> = ({ children, assignedJobs, onPhotoCapture, onAcceptJob, onUpdateStatus, onAddComment }) => {
  const [selectedJob, setSelectedJob] = useState<TechJob | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showReporterImage, setShowReporterImage] = useState(false);
  const { toast } = useToast();

  // Effect to refresh selected job when it changes in assignedJobs
  useEffect(() => {
    if (selectedJob) {
      const updatedJob = assignedJobs.find(job => job.id === selectedJob.id);
      if (updatedJob) {
        setSelectedJob(updatedJob);
      }
    }
  }, [assignedJobs, selectedJob]);

  const handleViewDetails = (job: TechJob) => {
    // When viewing details, get the latest photos from storage
    const latestPhotos = getJobPhotos(job.id);
    const updatedJob = {
      ...job,
      photos: latestPhotos
    };
    setSelectedJob(updatedJob);
    setShowJobDetails(true);
  };

  const handleViewReporterImage = (job: TechJob) => {
    // When viewing reporter image, get the latest photos from storage
    const latestPhotos = getJobPhotos(job.id);
    const updatedJob = {
      ...job,
      photos: latestPhotos
    };
    setSelectedJob(updatedJob);
    setShowReporterImage(true);
  };

  const handlePhotoCapture = (jobId: string, type: "before" | "after", imageUrl: string) => {
    // Call parent handler
    onPhotoCapture(jobId, type, imageUrl);
    
    // Update local state if the currently selected job is being updated
    if (selectedJob && selectedJob.id === jobId) {
      // Get all updated photos after the capture
      const updatedPhotos = getJobPhotos(jobId);
      
      setSelectedJob(prevJob => {
        if (!prevJob) return null;
        return {
          ...prevJob,
          photos: updatedPhotos
        };
      });
    }
    
    // Update localStorage
    const success = updateLocalStorageJobs(jobId, type, imageUrl);
    
    if (success) {
      // If this is an after photo and job is in_progress, let user know they can now complete the job
      if (type === "after" && selectedJob?.status === "in_progress") {
        toast({
          title: "After photo added",
          description: "You can now mark this job as complete.",
          variant: "default",
        });
      }
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
      onUpdateStatus,
      onAddComment
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
