
import React, { useEffect, useState } from "react";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import { useJobActions } from "./hooks/useJobActions";
import ReporterJobCardItem from "./ReporterJobCardItem";
import EmptyReporterJobs from "./EmptyReporterJobs";
import DashboardActions from "../admin/dashboard/DashboardActions";

interface ReporterJobCardsProps {
  setActiveTab?: (tab: string) => void;
}

const ReporterJobCards = ({ setActiveTab }: ReporterJobCardsProps) => {
  const { jobCards, setJobCards, isLoading } = useReporterJobs();
  const { handleAssignJob, handleResendEmail } = useJobActions({
    jobCards,
    setJobCards,
  });
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  
  // Add debounced update counter to prevent too frequent refreshes
  useEffect(() => {
    console.log("ReporterJobCards - Current job cards:", jobCards);
    console.log("ReporterJobCards - High priority jobs:", 
      jobCards.filter(job => job.priority === "high" || job.highPriority).length);
  }, [jobCards]);
  
  // Add event handler with debounce to prevent flashing
  useEffect(() => {
    const MIN_UPDATE_INTERVAL = 3000; // 3 seconds minimum between updates
    
    const handleJobsUpdated = () => {
      const now = Date.now();
      if (now - lastUpdateTime < MIN_UPDATE_INTERVAL) {
        console.log("Skipping update due to debounce");
        return;
      }
      
      setLastUpdateTime(now);
      // The actual update is handled by useReporterJobs hook
    };
    
    // Listen to job updates
    document.addEventListener("jobsUpdated", handleJobsUpdated);
    
    return () => {
      document.removeEventListener("jobsUpdated", handleJobsUpdated);
    };
  }, [lastUpdateTime]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Requests</h2>
          <p className="text-muted-foreground">
            {isLoading 
              ? "Loading maintenance requests..." 
              : `${jobCards.length} unassigned maintenance requests ready for processing`}
          </p>
        </div>
        <div className="w-64">
          <DashboardActions compact={true} />
        </div>
      </div>
      
      {isLoading ? (
        <div className="py-8 text-center">
          <p>Loading maintenance requests...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobCards && jobCards.length > 0 ? (
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
      )}
    </div>
  );
};

export default ReporterJobCards;
