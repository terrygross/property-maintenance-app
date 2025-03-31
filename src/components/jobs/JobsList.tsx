
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import JobDetailsDialog from "./JobDetailsDialog";
import { Job } from "./jobsListUtils";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";
import JobsTabs from "./JobsTabs";
import { useJobsData } from "@/hooks/jobs/useJobsData";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState("ongoing");
  const { toast } = useToast();
  const { jobs, setJobs } = useJobsData();

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  const handleMarkComplete = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    
    if (!job?.photos?.after) {
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
        description: "The job has been marked as complete.",
      });
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
      />

      <JobDetailsDialog 
        open={showJobDetails} 
        onOpenChange={setShowJobDetails} 
        job={selectedJob}
        onMarkComplete={handleMarkComplete}
      />
    </>
  );
};

export default JobsList;
