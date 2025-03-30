
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import JobsList from "./jobs/JobsList";
import EmptyJobsList from "./jobs/EmptyJobsList";
import JobDetailsDialog from "./jobs/JobDetailsDialog";
import ReporterImageDialog from "./jobs/ReporterImageDialog";
import { getPriorityColor, updateLocalStorageJobs } from "./jobs/JobUtils";
import { useAppState } from "@/context/AppStateContext";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface TechJobsTabProps {
  assignedJobs: Job[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
}

const TechJobsTab = ({ assignedJobs, onPhotoCapture }: TechJobsTabProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showReporterImage, setShowReporterImage] = useState(false);
  const { toast } = useToast();
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

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
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
  };

  const handleViewReporterImage = (job: Job) => {
    setSelectedJob(job);
    setShowReporterImage(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Assigned Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {updatedJobs.length === 0 ? (
            <EmptyJobsList />
          ) : (
            <JobsList 
              jobs={updatedJobs}
              onViewDetails={handleViewDetails}
              onViewReporterImage={handleViewReporterImage}
              getPriorityColor={getPriorityColor}
            />
          )}
        </CardContent>
      </Card>

      <JobDetailsDialog 
        showJobDetails={showJobDetails}
        setShowJobDetails={setShowJobDetails}
        selectedJob={selectedJob}
        getPriorityColor={getPriorityColor}
        handlePhotoCapture={handlePhotoCapture}
      />

      <ReporterImageDialog 
        showReporterImage={showReporterImage}
        setShowReporterImage={setShowReporterImage}
        selectedJob={selectedJob}
      />
    </>
  );
};

export default TechJobsTab;
