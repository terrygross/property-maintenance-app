
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import JobPhotosViewer from "./JobPhotosViewer";
import { Job } from "./jobsListUtils";

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
}

const JobDetailsDialog: React.FC<JobDetailsDialogProps> = ({ 
  open, 
  onOpenChange, 
  job 
}) => {
  if (!job) return null;

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
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
