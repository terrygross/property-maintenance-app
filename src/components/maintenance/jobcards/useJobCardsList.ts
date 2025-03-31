
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateJobStatus, updateJobPriority, getTechnicianJobs } from "../tech/jobs/JobUtils";
import { useAppState } from "@/context/AppStateContext";

export interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  status?: string;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

export const useJobCardsList = () => {
  const { users } = useAppState();
  const { toast } = useToast();
  
  const allMaintenanceTechs = users.filter(user => 
    user.role === "maintenance_tech"
  );
  
  const maintenanceTechs = allMaintenanceTechs.slice(0, 6);
  
  const [showTechJobs, setShowTechJobs] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [selectedTechName, setSelectedTechName] = useState<string>("");
  const [techJobs, setTechJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [jobsUpdated, setJobsUpdated] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing jobs...");
      if (selectedTechId) {
        refreshTechJobs(selectedTechId);
      }
      setJobsUpdated(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('jobsUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('jobsUpdated', handleStorageChange as EventListener);
    };
  }, [selectedTechId]);

  const refreshTechJobs = (techId: string) => {
    const jobs = getTechnicianJobs(techId);
    
    const formattedJobs = jobs.map(job => ({
      id: job.id,
      title: job.title,
      location: job.property || job.location,
      priority: job.priority || "medium",
      dueDate: new Date(job.dueDate || job.reportDate || Date.now()),
      status: job.status || "assigned",
      accepted: job.accepted || false,
      photos: {
        reporter: job.imageUrl || "",
        before: job.beforePhoto || "",
        after: job.afterPhoto || ""
      }
    }));
    
    console.log("Refreshed jobs for technician:", formattedJobs);
    setTechJobs(formattedJobs);
  };

  const handleViewJobs = (techId: string) => {
    const tech = maintenanceTechs.find(t => t.id === techId);
    if (tech) {
      setSelectedTechId(techId);
      setSelectedTechName(`${tech.first_name} ${tech.last_name}`);
      
      refreshTechJobs(techId);
      setShowTechJobs(true);
    }
  };

  const handleUpdateStatus = (jobId: string, status: string) => {
    const success = updateJobStatus(jobId, status);
    
    if (success) {
      setTechJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status } 
            : job
        )
      );
      
      toast({
        title: "Job status updated",
        description: `Job has been marked as ${status}`,
      });
    } else if (status === "completed") {
      toast({
        title: "After photo required",
        description: "The job cannot be marked as complete until the technician uploads an 'after' photo.",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdatePriority = (jobId: string, priority: string) => {
    const success = updateJobPriority(jobId, priority);
    
    if (success) {
      setTechJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, priority } 
            : job
        )
      );
      
      toast({
        title: "Priority updated",
        description: `Job priority changed to ${priority}`,
      });
    }
  };
  
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  const handleViewReporterImage = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  return {
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
  };
};
