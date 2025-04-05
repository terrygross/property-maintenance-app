
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import JobPhotoUpload from "../JobPhotoUpload";
import JobPhotosViewer from "@/components/jobs/JobPhotosViewer";
import JobComments from "./JobComments";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  status?: string;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
  comments?: string[];
}

interface JobDetailsDialogProps {
  showJobDetails: boolean;
  setShowJobDetails: (show: boolean) => void;
  selectedJob: Job | null;
  getPriorityColor: (priority: string) => string;
  handlePhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  handleUpdateJobStatus?: (jobId: string, status: string) => void;
  handleAddComment?: (jobId: string, comment: string) => void;
}

const JobDetailsDialog = ({ 
  showJobDetails, 
  setShowJobDetails, 
  selectedJob,
  getPriorityColor,
  handlePhotoCapture,
  handleUpdateJobStatus,
  handleAddComment
}: JobDetailsDialogProps) => {
  if (!selectedJob) return null;
  
  const [selectedStatus, setSelectedStatus] = useState(selectedJob.status || "assigned");
  
  const statusOptions = [
    { value: "assigned", label: "Assigned" },
    { value: "in_progress", label: "In Progress" },
    { value: "on_hold", label: "On Hold (Waiting for Parts)" },
    { value: "completed", label: "Completed" }
  ];
  
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    if (handleUpdateJobStatus) {
      handleUpdateJobStatus(selectedJob.id, value);
    }
  };
  
  return (
    <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedJob?.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
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
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={handleStatusChange}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          
          {/* Add JobComments component */}
          <div className="border-t pt-4">
            <JobComments 
              jobId={selectedJob.id} 
              existingComments={selectedJob.comments || []} 
              onAddComment={handleAddComment || (() => {})} 
            />
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
