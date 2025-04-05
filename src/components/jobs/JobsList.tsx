
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import JobDetailsDialog from "./JobDetailsDialog";
import { Job } from "./jobsListUtils";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";
import JobsTabs from "./JobsTabs";
import { useJobsData } from "@/hooks/jobs/useJobsData";
import { useAppState } from "@/context/AppStateContext";
import { hasAdminAccess } from "@/types/user";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState("ongoing");
  const { toast } = useToast();
  const { jobs, setJobs } = useJobsData();
  const { currentUser } = useAppState();
  const isAdmin = currentUser ? hasAdminAccess(currentUser.role) : false;

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  const handleMarkComplete = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    
    // Check if user is admin or if the job has an after photo
    if (!job?.photos?.after && !isAdmin) {
      toast({
        title: "After photo required",
        description: "This job cannot be marked as complete until the technician uploads an 'after' photo.",
        variant: "destructive",
      });
      return;
    }
    
    const success = updateJobStatus(jobId, "completed");
    
    if (success) {
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status: "completed" } 
            : job
        )
      );
      
      toast({
        title: "Job completed",
        description: isAdmin && !job?.photos?.after 
          ? "Job completed by admin override." 
          : "The job has been marked as complete.",
      });

      // Dispatch events to notify other components
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const ongoingJobs = jobs.filter(job => job.status !== "completed");
  const completedJobs = jobs.filter(job => job.status === "completed");

  return (
    <>
      <JobsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ongoingJobs={ongoingJobs}
        completedJobs={completedJobs}
        onViewDetails={handleViewDetails}
        onMarkComplete={handleMarkComplete}
        jobs={jobs}
        setJobs={setJobs}
        isAdmin={isAdmin}
      />

      <JobDetailsDialog 
        open={showJobDetails} 
        onOpenChange={setShowJobDetails} 
        job={selectedJob}
        onMarkComplete={handleMarkComplete}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default JobsList;
