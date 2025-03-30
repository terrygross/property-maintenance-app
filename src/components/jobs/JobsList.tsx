
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import JobsContainer from "./JobsContainer";
import JobDetailsDialog from "./JobDetailsDialog";
import { Job } from "./jobsListUtils";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const { toast } = useToast();
  const { users } = useAppState();
  
  // Load jobs from localStorage on component mount
  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        // Filter to only show assigned jobs
        const assignedJobs = parsedJobs.filter((job: any) => job.status === "assigned");
        
        // Format the jobs to match our component's expected structure
        const formattedJobs = assignedJobs.map((job: any) => {
          // Find the assigned technician
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
      }
    } catch (error) {
      console.error("Error loading assigned jobs:", error);
    }
  }, [users]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  return (
    <>
      <JobsContainer 
        jobs={jobs} 
        onViewDetails={handleViewDetails} 
      />

      <JobDetailsDialog 
        open={showJobDetails} 
        onOpenChange={setShowJobDetails} 
        job={selectedJob} 
      />
    </>
  );
};

export default JobsList;
