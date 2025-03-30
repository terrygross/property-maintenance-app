
import { useState, useEffect } from "react";

export function useHighPriorityJobsMonitor() {
  const [highPriorityJobs, setHighPriorityJobs] = useState<any[]>([]);

  useEffect(() => {
    const checkHighPriorityJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          const highPriorityUnassigned = parsedJobs.filter((job: any) => 
            job.priority === "high" && job.status === "unassigned"
          );
          
          setHighPriorityJobs(highPriorityUnassigned);
        }
      } catch (error) {
        console.error("Error checking high priority jobs:", error);
      }
    };
    
    checkHighPriorityJobs();
    
    const interval = setInterval(checkHighPriorityJobs, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return highPriorityJobs;
}
