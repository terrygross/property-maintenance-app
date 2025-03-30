
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, Check, AlertTriangle } from "lucide-react";
import JobPhotosViewer from "./JobPhotosViewer";
import { Job } from "./jobsListUtils";

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
  onMarkComplete?: (jobId: string) => void;
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({ 
  open, 
  onOpenChange, 
  job,
  onMarkComplete
}) => {
  if (!job) return null;
  
  const isCompleted = job.status === "completed";
  const hasAfterPhoto = Boolean(job.photos?.after);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm">{job.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Priority</p>
              <p className="text-sm">{job.priority}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm">{job.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Assigned To</p>
              <p className="text-sm">{job.assignedTo}</p>
              
              {/* Email status for contractors */}
              {job.techRole === "contractor" && (
                <Badge 
                  variant={job.emailSent ? "outline" : "secondary"} 
                  className="mt-1 flex items-center gap-1 text-xs"
                >
                  <Mail className="h-3 w-3" />
                  {job.emailSent ? "Email Sent" : "Email Pending"}
                </Badge>
              )}
            </div>
            <div>
              <p className="text-sm font-medium">Due Date</p>
              <p className="text-sm">{job.dueDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          {/* Photo viewer component */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Job Photos</h4>
            <JobPhotosViewer 
              reporterPhoto={job.photos?.reporter}
              beforePhoto={job.photos?.before}
              afterPhoto={job.photos?.after}
            />
            
            {!hasAfterPhoto && !isCompleted && (
              <div className="mt-2 flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs">After photo required to mark job as complete</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            {!isCompleted && hasAfterPhoto && onMarkComplete && (
              <Button 
                variant="outline" 
                className="bg-green-50 hover:bg-green-100"
                onClick={() => {
                  onMarkComplete(job.id);
                  onOpenChange(false);
                }}
              >
                <Check className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
            )}
            <div className="ml-auto">
              <Button onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
