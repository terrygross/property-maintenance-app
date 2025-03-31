
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import JobCard from "../tech/jobs/JobCard";
import { getPriorityColor } from "../tech/jobs/JobUtils";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  status?: string;
  accepted?: boolean;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface TechnicianJobsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  techJobs: Job[];
  technicianName: string;
  onViewDetails: (job: Job) => void;
  onViewReporterImage: (job: Job) => void;
  onUpdateStatus: (jobId: string, status: string) => void;
  onUpdatePriority: (jobId: string, priority: string) => void;
}

const TechnicianJobsDialog = ({
  isOpen,
  onOpenChange,
  techJobs,
  technicianName,
  onViewDetails,
  onViewReporterImage,
  onUpdateStatus,
  onUpdatePriority
}: TechnicianJobsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Jobs Assigned to {technicianName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {techJobs.length > 0 ? (
            techJobs.map(job => (
              <JobCard 
                key={job.id}
                job={job}
                onViewDetails={onViewDetails}
                onViewReporterImage={onViewReporterImage}
                onUpdateStatus={onUpdateStatus}
                onUpdatePriority={onUpdatePriority}
                getPriorityColor={getPriorityColor}
                isAdmin={true}
              />
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No jobs assigned to this technician</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TechnicianJobsDialog;
