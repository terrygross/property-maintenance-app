
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import JobDetailsDialog from "./JobDetailsDialog";
import { Job } from "./jobsListUtils";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";
import JobsTabs from "./JobsTabs";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState("ongoing");
  const { toast } = useToast();
  const { users } = useAppState();
  
  useEffect(() => {
    try {
      const loadJobs = () => {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          const formattedJobs = parsedJobs
            .filter((job: any) => job.status !== "unassigned")
            .map((job: any) => {
              const assignedTech = job.assignedTo ? 
                users.find((user: any) => user.id === job.assignedTo) : null;
              
              return {
                id: job.id,
                title: job.title,
                location: job.property,
                priority: job.priority || "medium",
                status: job.status,
                assignedTo: assignedTech ? 
                  `${assignedTech.first_name} ${assignedTech.last_name}` : 
                  "Unassigned",
                techId: job.assignedTo,
                techRole: assignedTech?.role || "",
                emailSent: job.emailSent || false,
                dueDate: new Date(new Date(job.reportDate).getTime() + 7 * 24 * 60 * 60 * 1000),
                photos: { 
                  reporter: job.imageUrl,
                  before: job.beforePhoto || "",
                  after: job.afterPhoto || ""
                }
              };
            });
          
          setJobs(formattedJobs);
          console.log("Admin Jobs tab - loaded assigned jobs:", formattedJobs);
        }
      };
      
      loadJobs();
      
      window.addEventListener('storage', loadJobs);
      
      return () => {
        window.removeEventListener('storage', loadJobs);
      };
    } catch (error) {
      console.error("Error loading assigned jobs:", error);
    }
  }, [users]);

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
