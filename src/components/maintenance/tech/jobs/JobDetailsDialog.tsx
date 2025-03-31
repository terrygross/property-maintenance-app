
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobPhotoUpload from "../JobPhotoUpload";
import JobPhotosViewer from "@/components/jobs/JobPhotosViewer";

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

interface JobDetailsDialogProps {
  showJobDetails: boolean;
  setShowJobDetails: (show: boolean) => void;
  selectedJob: Job | null;
  getPriorityColor: (priority: string) => string;
  handlePhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
}

const JobDetailsDialog = ({ 
  showJobDetails, 
  setShowJobDetails, 
  selectedJob,
  getPriorityColor,
  handlePhotoCapture
}: JobDetailsDialogProps) => {
  if (!selectedJob) return null;
  
  return (
    <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{selectedJob?.title}</DialogTitle>
        </DialogHeader>
        
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
          
          {/* Use JobPhotosViewer for existing photos */}
          {(selectedJob.photos?.reporter || selectedJob.photos?.before || selectedJob.photos?.after) && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Current Photos</h4>
              <JobPhotosViewer 
                reporterPhoto={selectedJob.photos?.reporter} 
                beforePhoto={selectedJob.photos?.before}
                afterPhoto={selectedJob.photos?.after}
              />
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
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
