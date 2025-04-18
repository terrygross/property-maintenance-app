
import React, { useState, useEffect } from "react";
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
  
  // Listen for job updates from other components
  useEffect(() => {
    const handleJobsUpdated = () => {
      console.log("Jobs updated event received");
    };
    
    document.addEventListener('jobsUpdated', handleJobsUpdated);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      document.removeEventListener('jobsUpdated', handleJobsUpdated);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'jobs' || event.key === null) {
      console.log("Storage changed, potentially jobs updated");
    }
  };

  const handleViewDetails = (job: Job) => {
    if (!job) {
      console.error("Attempted to view details of undefined job");
      return;
    }
    
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  const handleMarkComplete = (jobId: string, isAdminOverride: boolean = false) => {
    try {
      const job = jobs.find(j => j.id === jobId);
      
      if (!job) {
        console.error(`Job with ID ${jobId} not found`);
        toast({
          title: "Error",
          description: "Could not find the job to mark as complete.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if user is admin or if the job has an after photo
      if (!job?.photos?.after && !isAdmin) {
        toast({
          title: "After photo required",
          description: "This job cannot be marked as complete until the technician uploads an 'after' photo.",
          variant: "destructive",
        });
        return;
      }
      
      const success = updateJobStatus(jobId, "completed", isAdminOverride);
      
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
          description: isAdminOverride 
            ? "Job completed by admin override." 
            : "The job has been marked as complete.",
        });

        // Dispatch events to notify other components
        const event = new Event('jobsUpdated');
        document.dispatchEvent(event);
        window.dispatchEvent(new Event('storage'));
      } else {
        toast({
          title: "Error",
          description: "Failed to mark job as complete. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error marking job as complete:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter jobs by status
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

      {selectedJob && (
        <JobDetailsDialog 
          open={showJobDetails} 
          onOpenChange={setShowJobDetails} 
          job={selectedJob}
          onMarkComplete={handleMarkComplete}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
};

export default JobsList;
