
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, ShieldAlert } from "lucide-react";
import { getPriorityColor } from "../tech/jobs/JobUtils";

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
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJob: Job | null;
  onUpdateStatus: (jobId: string, status: string) => void;
  isAdmin?: boolean;
}

const JobDetailsDialog = ({
  isOpen,
  onOpenChange,
  selectedJob,
  onUpdateStatus,
  isAdmin = false
}: JobDetailsDialogProps) => {
  if (!selectedJob) return null;
  
  const handleMarkComplete = () => {
    onUpdateStatus(selectedJob.id, "completed");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
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
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm">{selectedJob.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Due Date</p>
              <p className="text-sm">{selectedJob.dueDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Job Photos</h4>
            
            {selectedJob.photos?.reporter && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Reporter Photo:</p>
                <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                  <img 
                    src={selectedJob.photos.reporter} 
                    alt="Reported issue" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              </div>
            )}
            
            {selectedJob.photos?.before && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Before Photo:</p>
                <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                  <img 
                    src={selectedJob.photos.before} 
                    alt="Before work" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              </div>
            )}
            
            {selectedJob.photos?.after && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">After Photo:</p>
                <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                  <img 
                    src={selectedJob.photos.after} 
                    alt="After work" 
                    className="max-w-full max-h-60 object-contain"
                  />
                </div>
              </div>
            )}
            
            {!selectedJob.photos?.after && selectedJob.status !== "completed" && !isAdmin && (
              <div className="mt-2 flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs">Technician needs to upload an after photo before this job can be marked as complete</p>
              </div>
            )}
            
            {!selectedJob.photos?.after && selectedJob.status !== "completed" && isAdmin && (
              <div className="mt-2 flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-md">
                <ShieldAlert className="h-4 w-4" />
                <p className="text-xs">As admin, you can override and mark this job complete without an after photo</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            {selectedJob.status !== "completed" && (selectedJob.photos?.after || isAdmin) && (
              <Button 
                variant="outline" 
                className={isAdmin && !selectedJob.photos?.after ? "bg-amber-50 hover:bg-amber-100" : "bg-green-50 hover:bg-green-100"}
                onClick={handleMarkComplete}
              >
                <Check className="h-4 w-4 mr-1" />
                {isAdmin && !selectedJob.photos?.after ? "Admin Override: Mark Complete" : "Mark Complete"}
              </Button>
            )}
            <div className={(selectedJob.status !== "completed" && (selectedJob.photos?.after || isAdmin)) ? "ml-auto" : "w-full"}>
              <Button 
                className={(selectedJob.status !== "completed" && (selectedJob.photos?.after || isAdmin)) ? "" : "w-full"} 
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
