
import React, { useEffect } from "react";
import TechJobsTab from "./jobs/TechJobsTab";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  status?: string;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface TechJobsTabContainerProps {
  assignedJobs: Job[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
}

const TechJobsTabContainer = ({ 
  assignedJobs, 
  onPhotoCapture, 
  onAcceptJob, 
  onUpdateStatus 
}: TechJobsTabContainerProps) => {
  const { toast } = useToast();

  useEffect(() => {
    try {
      const currentTechId = "1"; 
      
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        const techJobs = parsedJobs.filter((job: any) => 
          job.status === "assigned" && job.assignedTo === currentTechId
        );
        
        if (techJobs.length > 0) {
          console.log("Found tech jobs in localStorage:", techJobs);
        }
      }
    } catch (error) {
      console.error("Error loading tech jobs:", error);
    }
  }, []);

  return (
    <TechJobsTab 
      assignedJobs={assignedJobs}
      onPhotoCapture={onPhotoCapture}
      onAcceptJob={onAcceptJob}
      onUpdateStatus={onUpdateStatus}
    />
  );
};

export default TechJobsTabContainer;
