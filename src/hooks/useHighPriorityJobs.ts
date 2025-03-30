
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

export const useHighPriorityJobs = (userId: string) => {
  const [highPriorityJobs, setHighPriorityJobs] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load high priority jobs from localStorage
    const checkHighPriorityJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          // Filter to only show assigned high priority jobs for this technician that are not accepted
          const highPriorityAssigned = parsedJobs.filter((job: any) => 
            job.priority === "high" && 
            job.status === "assigned" && 
            job.assignedTo === userId &&
            !job.accepted
          );
          
          setHighPriorityJobs(highPriorityAssigned);
          
          // Show toast for newly assigned high priority jobs
          highPriorityAssigned.forEach(job => {
            if (!job.alertShown) {
              toast({
                title: "High Priority Alert!",
                description: `URGENT: ${job.title} requires immediate attention!`,
                variant: "destructive",
                duration: 10000, // Show for 10 seconds
              });
              
              // Mark as shown in localStorage to prevent duplicate notifications
              const updatedJobs = parsedJobs.map((j: any) => 
                j.id === job.id ? { ...j, alertShown: true } : j
              );
              localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
            }
          });
        }
      } catch (error) {
        console.error("Error checking high priority jobs:", error);
      }
    };
    
    // Initial check
    checkHighPriorityJobs();
    
    // Set up periodic checks
    const interval = setInterval(checkHighPriorityJobs, 10000);
    
    return () => clearInterval(interval);
  }, [toast, userId]);

  return { highPriorityJobs };
};
