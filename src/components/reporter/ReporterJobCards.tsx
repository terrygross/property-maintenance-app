
import React from "react";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import { useJobActions } from "./hooks/useJobActions";
import ReporterJobCardItem from "./ReporterJobCardItem";
import EmptyReporterJobs from "./EmptyReporterJobs";
import DashboardActions from "../admin/dashboard/DashboardActions";

const ReporterJobCards = () => {
  const { jobCards, setJobCards } = useReporterJobs();
  const { handleAssignJob, handleResendEmail } = useJobActions({
    jobCards,
    setJobCards,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-2xl font-bold">Reported Jobs</h2>
        <div className="w-64">
          <DashboardActions />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobCards.length > 0 ? (
          jobCards.map(job => (
            <ReporterJobCardItem
              key={job.id}
              job={job}
              onAssign={handleAssignJob}
              onResendEmail={handleResendEmail}
            />
          ))
        ) : (
          <EmptyReporterJobs />
        )}
      </div>
    </div>
  );
};

export default ReporterJobCards;
