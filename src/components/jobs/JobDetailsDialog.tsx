
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, ShieldAlert } from "lucide-react";
import { getPriorityColor } from "../maintenance/tech/jobs/JobUtils";

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
}

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
  onMarkComplete: (jobId: string) => void;
  isAdmin?: boolean;
}

const JobDetailsDialog = ({
  open,
  onOpenChange,
  job,
  onMarkComplete,
  isAdmin = false
}: JobDetailsDialogProps) => {
  if (!job) return null;
  
  const handleMarkComplete = () => {
    onMarkComplete(job.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job?.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm">{job.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Priority</p>
              <Badge className={getPriorityColor(job.priority)}>
                {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm">{job.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Due Date</p>
              <p className="text-sm">{job.dueDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Job Photos</h4>
            
            {job.photos?.reporter && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Reporter Photo:</p>
                <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                  <img 
                    src={job.photos.reporter} 
                    alt="Reported issue" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              </div>
            )}
            
            {job.photos?.before && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Before Photo:</p>
                <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                  <img 
                    src={job.photos.before} 
                    alt="Before work" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              </div>
            )}
            
            {job.photos?.after && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">After Photo:</p>
                <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                  <img 
                    src={job.photos.after} 
                    alt="After work" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              </div>
            )}
            
            {!job.photos?.after && job.status !== "completed" && !isAdmin && (
              <div className="mt-2 flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs">Technician needs to upload an after photo before this job can be marked as complete</p>
              </div>
            )}
            
            {!job.photos?.after && job.status !== "completed" && isAdmin && (
              <div className="mt-2 flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-md">
                <ShieldAlert className="h-4 w-4" />
                <p className="text-xs">As admin, you can override and mark this job complete without an after photo</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            {job.status !== "completed" && (job.photos?.after || isAdmin) && (
              <Button 
                variant="outline" 
                className={isAdmin && !job.photos?.after ? "bg-amber-50 hover:bg-amber-100" : "bg-green-50 hover:bg-green-100"}
                onClick={handleMarkComplete}
              >
                <Check className="h-4 w-4 mr-1" />
                {isAdmin && !job.photos?.after ? "Admin Override: Mark Complete" : "Mark Complete"}
              </Button>
            )}
            <div className={(job.status !== "completed" && (job.photos?.after || isAdmin)) ? "ml-auto" : "w-full"}>
              <Button 
                className={(job.status !== "completed" && (job.photos?.after || isAdmin)) ? "" : "w-full"} 
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsDialog;
