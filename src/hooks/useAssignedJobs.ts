
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateJobAcceptance, updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";

interface Job {
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

export const useAssignedJobs = (currentUserId: string) => {
  const [assignedJobs, setAssignedJobs] = useState<Job[]>([
    { 
      id: "j1", 
      title: "Fix heating system", 
      location: "Building A", 
      priority: "high", 
      dueDate: new Date(2023, 11, 30),
      photos: { before: "", after: "", reporter: "/images/broken-heater.jpg" },
      accepted: false,
      status: "assigned"
    },
    { 
      id: "j2", 
      title: "Replace light fixtures", 
      location: "Building C", 
      priority: "medium", 
      dueDate: new Date(2023, 12, 5),
      photos: { before: "", after: "", reporter: "/images/broken-light.jpg" },
      status: "assigned"
    },
    { 
      id: "j3", 
      title: "Inspect water damage", 
      location: "Building B", 
      priority: "low", 
      dueDate: new Date(2023, 12, 10),
      photos: { before: "", after: "", reporter: "/images/water-damage.jpg" },
      status: "assigned"
    },
    { 
      id: "j4", 
      title: "URGENT: Electrical hazard", 
      location: "Main Building", 
      priority: "high", 
      dueDate: new Date(), // Today
      photos: { before: "", after: "", reporter: "/images/electrical-hazard.jpg" },
      accepted: false,
      status: "assigned"
    }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        // Update assigned jobs from localStorage
        if (parsedJobs.length > 0) {
          const techJobs = parsedJobs
            .filter((job: any) => job.status === "assigned" || job.status === "in_progress" || 
                               (job.status === "completed" && job.assignedTo === currentUserId))
            .map((job: any) => ({
              id: job.id,
              title: job.title,
              location: job.property || job.location,
              priority: job.priority,
              dueDate: new Date(job.dueDate || Date.now()),
              photos: {
                before: job.beforePhoto || "",
                after: job.afterPhoto || "",
                reporter: job.imageUrl || ""
              },
              accepted: job.accepted || false,
              status: job.status || "assigned"
            }));
          
          if (techJobs.length > 0) {
            setAssignedJobs(prevJobs => {
              // Merge with existing jobs by replacing matching IDs
              const existingJobIds = prevJobs.map(j => j.id);
              
              // Keep non-matched default jobs + add new ones from localStorage
              return [
                ...prevJobs.filter(j => !techJobs.some(tj => tj.id === j.id)),
                ...techJobs
              ];
            });
          }
        }
      }
    } catch (error) {
      console.error("Error loading tech jobs:", error);
    }
  }, [currentUserId]);

  // Function to handle photo updates for jobs
  const handleJobPhotoUpdate = (jobId: string, type: "before" | "after", imageUrl: string) => {
    setAssignedJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            photos: {
              ...job.photos,
              [type]: imageUrl
            }
          };
        }
        return job;
      })
    );
    
    toast({
      title: "Photo updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} photo has been saved.`,
    });
    
    // In a real application, this would sync with the backend
    console.log(`Updated ${type} photo for job ${jobId}`);
  };

  // Function to handle accepting high priority jobs
  const handleAcceptJob = (jobId: string) => {
    // Update the UI
    setAssignedJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            accepted: true
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = updateJobAcceptance(jobId);
    
    if (success) {
      toast({
        title: "Job Accepted",
        description: "You have accepted this high-priority job. It will be prioritized in your work queue.",
        variant: "default",
      });
    }
  };
  
  // Function to handle updating job status
  const handleUpdateJobStatus = (jobId: string, status: string) => {
    // Update the UI
    setAssignedJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: status
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = updateJobStatus(jobId, status);
    
    if (success) {
      toast({
        title: status === "in_progress" ? "Job Started" : "Job Completed",
        description: status === "in_progress" 
          ? "You have marked this job as in progress." 
          : "You have marked this job as complete.",
        variant: "default",
      });
    }
  };

  return {
    assignedJobs,
    handleJobPhotoUpdate,
    handleAcceptJob,
    handleUpdateJobStatus
  };
};
