
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JobPhotoUpload from "./JobPhotoUpload";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  photos?: {
    before?: string;
    after?: string;
  };
}

interface TechJobsTabProps {
  assignedJobs: Job[];
}

const TechJobsTab = ({ assignedJobs: initialJobs }: TechJobsTabProps) => {
  const [assignedJobs, setAssignedJobs] = useState<Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const { toast } = useToast();

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
    setAssignedJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            photos: {
              ...job.photos,
              [type]: imageUrl
            }
          };
        }
        return job;
      })
    );
    
    // Update selected job if it's the one being modified
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob({
        ...selectedJob,
        photos: {
          ...selectedJob.photos,
          [type]: imageUrl
        }
      });
    }
    
    toast({
      title: "Photo updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} photo has been updated.`,
    });
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
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Photos</h4>
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
    </>
  );
};

export default TechJobsTab;
