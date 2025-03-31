
import React from "react";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import { useJobActions } from "./hooks/useJobActions";
import ReporterJobCardItem from "./ReporterJobCardItem";
import EmptyReporterJobs from "./EmptyReporterJobs";

const ReporterJobCards = () => {
  const { jobCards, setJobCards } = useReporterJobs();
  const { handleAssignJob, handleResendEmail, handleAcceptJob } = useJobActions({
    jobCards,
    setJobCards,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobCards.length > 0 ? (
        jobCards.map(job => (
          <ReporterJobCardItem
            key={job.id}
            job={job}
            onAssign={handleAssignJob}
            onResendEmail={handleResendEmail}
            onAcceptJob={handleAcceptJob}
          />
        ))
      ) : (
        <EmptyReporterJobs />
      )}
    </div>
  );
};

export default ReporterJobCards;
