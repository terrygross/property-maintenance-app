
import React from "react";
import { useJobCardsList } from "./useJobCardsList";
import TechnicianCard from "./TechnicianCard";
import TechnicianJobsDialog from "./TechnicianJobsDialog";
import JobDetailsDialog from "./JobDetailsDialog";
import { getPriorityColor } from "../tech/jobs/JobUtils";
import { hasAdminAccess } from "@/types/user";

interface JobCardsListProps {
  userRole?: string;
}

const JobCardsList = ({ userRole = "admin" }: JobCardsListProps) => {
  const {
    maintenanceTechs,
    techJobs,
    selectedJob,
    selectedTechName,
    showTechJobs,
    showJobDetails,
    setShowTechJobs,
    setShowJobDetails,
    handleViewJobs,
    handleViewDetails,
    handleViewReporterImage,
    handleUpdateStatus,
    handleUpdatePriority
  } = useJobCardsList();
  
  const isAdminOrManager = hasAdminAccess(userRole as any);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Job Cards</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {maintenanceTechs.length}/6 technicians (Basic plan)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {maintenanceTechs.length > 0 ? (
          maintenanceTechs.map(tech => (
            <TechnicianCard 
              key={tech.id} 
              tech={tech} 
              onViewJobs={handleViewJobs} 
            />
          ))
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">No maintenance technicians found</p>
          </div>
        )}
      </div>
      
      {/* Technician Jobs Dialog */}
      <TechnicianJobsDialog
        isOpen={showTechJobs}
        onOpenChange={setShowTechJobs}
        techJobs={techJobs}
        technicianName={selectedTechName}
        onViewDetails={handleViewDetails}
        onViewReporterImage={handleViewReporterImage}
        onUpdateStatus={handleUpdateStatus}
        onUpdatePriority={handleUpdatePriority}
      />
      
      {/* Job Details Dialog */}
      <JobDetailsDialog
        isOpen={showJobDetails}
        onOpenChange={setShowJobDetails}
        selectedJob={selectedJob}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default JobCardsList;
