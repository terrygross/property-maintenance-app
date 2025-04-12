
import React, { useState } from "react";
import { JobCardProps } from "../job/jobCardTypes";
import JobCard from "../job/JobCard";
import JobPhotosViewer from "../jobs/JobPhotosViewer";
import AssignJobDialog from "../job/AssignJobDialog";
import { useToast } from "@/hooks/use-toast";

interface ReporterJobCardItemProps {
  job: JobCardProps;
  onAssign: (jobId: string, technicianId: string, priority: string) => void;
  onResendEmail: (jobId: string) => void;
}

const ReporterJobCardItem = ({ 
  job, 
  onAssign, 
  onResendEmail 
}: ReporterJobCardItemProps) => {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const { toast } = useToast();
  
  const handleAssign = async (jobId: string, technicianId: string, priority: string) => {
    try {
      await onAssign(jobId, technicianId, priority);
      return true;
    } catch (error) {
      console.error("Assignment failed in ReporterJobCardItem:", error);
      return false;
    }
  };
  
  const handleResendEmail = (jobId: string) => {
    onResendEmail(jobId, "");
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <JobCard
        {...job}
        onAssign={() => setShowAssignDialog(true)}
        onResendEmail={handleResendEmail}
      />
      
      <JobPhotosViewer reporterPhoto={job.reporterPhoto} />
      
      {showAssignDialog && (
        <AssignJobDialog
          jobId={job.id}
          priority={job.priority}
          open={showAssignDialog}
          onOpenChange={setShowAssignDialog}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default ReporterJobCardItem;
