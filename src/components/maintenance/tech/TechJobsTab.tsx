
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JobPhotoUpload from "./JobPhotoUpload";
import { useToast } from "@/hooks/use-toast";
import { Camera, Image as ImageIcon } from "lucide-react";

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

  // On mount, check localStorage for reporter jobs that have been assigned to this technician
  useEffect(() => {
    try {
      // For demo purposes, let's assume the current technician has id "3" (Mike Johnson)
      const currentTechId = "3"; 
      
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        // Filter for jobs assigned to this technician
        const techJobs = parsedJobs.filter((job: any) => 
          job.status === "assigned" && job.assignedTo === currentTechId
        );
        
        // Update any existing assignedJobs with reporter photos from localStorage
        if (techJobs.length > 0) {
          // This would be handled by your state management in a real app
          console.log("Found tech jobs in localStorage:", techJobs);
        }
      }
    } catch (error) {
      console.error("Error loading tech jobs:", error);
    }
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handlePhotoCapture = (jobId: string, type: "before" | "after", imageUrl: string) => {
    onPhotoCapture(jobId, type, imageUrl);
    
    // Update selected job UI if it's the one being modified
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({
        ...selectedJob,
        photos: {
          ...selectedJob.photos,
          [type]: imageUrl
        }
      });
    }
    
    // Also update in localStorage if this job exists there
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        const updatedJobs = parsedJobs.map((job: any) => {
          if (job.id === jobId) {
            return {
              ...job,
              [type === "before" ? "beforePhoto" : "afterPhoto"]: imageUrl
            };
          }
          return job;
        });
        localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      }
    } catch (error) {
      console.error("Error updating job photos in localStorage:", error);
    }
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
          {assignedJobs.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-muted-foreground">No jobs currently assigned</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignedJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{job.title}</h3>
                        <Badge className={getPriorityColor(job.priority)}>
                          {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                      <p className="text-xs mt-2">
                        Due: {job.dueDate.toLocaleDateString()}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.photos?.reporter && (
                          <Badge 
                            variant="outline" 
                            className="bg-purple-50 cursor-pointer"
                            onClick={() => handleViewReporterImage(job)}
                          >
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Reporter Photo
                          </Badge>
                        )}
                        {job.photos?.before && (
                          <Badge variant="outline" className="bg-blue-50">
                            Before Photo ✓
                          </Badge>
                        )}
                        {job.photos?.after && (
                          <Badge variant="outline" className="bg-green-50">
                            After Photo ✓
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(job)}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Job details dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <Badge className={getPriorityColor(selectedJob.priority)}>
                    {selectedJob.priority.charAt(0).toUpperCase() + selectedJob.priority.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm">{selectedJob.dueDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              {selectedJob.photos?.reporter && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Reporter Photo</h4>
                  <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                    <img 
                      src={selectedJob.photos.reporter} 
                      alt="Reported issue" 
                      className="max-w-full max-h-60 object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Photo uploaded by reporter</p>
                </div>
              )}
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Your Photos</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Before Job</p>
                    <JobPhotoUpload 
                      jobId={selectedJob.id} 
                      label="Before Photo" 
                      onPhotoCapture={handlePhotoCapture}
                      photoType="before"
                      existingImage={selectedJob.photos?.before}
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">After Job</p>
                    <JobPhotoUpload 
                      jobId={selectedJob.id} 
                      label="After Photo" 
                      onPhotoCapture={handlePhotoCapture}
                      photoType="after"
                      existingImage={selectedJob.photos?.after}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setShowJobDetails(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reporter image dialog */}
      <Dialog open={showReporterImage} onOpenChange={setShowReporterImage}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reporter Photo</DialogTitle>
          </DialogHeader>
          {selectedJob && selectedJob.photos?.reporter && (
            <div className="w-full rounded-md overflow-hidden flex justify-center">
              <img 
                src={selectedJob.photos.reporter} 
                alt="Reporter photo"
                className="max-h-[70vh] object-contain"
              />
            </div>
          )}
          <div className="mt-2 text-sm text-gray-500">
            Photo uploaded by the reporter to help identify the issue location
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechJobsTab;
