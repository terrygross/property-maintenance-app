
/**
 * Hook for monitoring high priority jobs
 */
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { HighPriorityJob, UseHighPriorityJobsReturn } from "./types";
import { loadHighPriorityJobs, markHighPriorityJobsAsShown } from "./jobsStorage";

export const useHighPriorityJobs = (userId: string): UseHighPriorityJobsReturn => {
  const [highPriorityJobs, setHighPriorityJobs] = useState<HighPriorityJob[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load high priority jobs from localStorage
    const checkHighPriorityJobs = () => {
      try {
        const loadedJobs = loadHighPriorityJobs(userId);
        setHighPriorityJobs(loadedJobs);
        
        // Show toast for newly assigned high priority jobs
        const unshownJobs = loadedJobs.filter(job => !job.alertShown);
        
        unshownJobs.forEach(job => {
          toast({
            title: "High Priority Alert!",
            description: `URGENT: ${job.title} requires immediate attention!`,
            variant: "destructive",
            duration: 10000, // Show for 10 seconds
          });
        });
        
        // Mark jobs as shown in localStorage
        if (unshownJobs.length > 0) {
          markHighPriorityJobsAsShown(unshownJobs);
        }
      } catch (error) {
        console.error("Error checking high priority jobs:", error);
      }
    };
    
    // Initial check
    checkHighPriorityJobs();
    
    // Set up periodic checks
    const interval = setInterval(checkHighPriorityJobs, 10000);
    
    // Listen for storage events to update jobs when they change
    const handleStorageChange = () => {
      checkHighPriorityJobs();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup interval and event listener on unmount
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [toast, userId]);

  return { highPriorityJobs };
};
