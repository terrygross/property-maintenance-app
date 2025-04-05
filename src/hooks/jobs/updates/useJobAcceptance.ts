
import { useToast } from "@/hooks/use-toast";
import { updateJobAcceptance } from "@/components/maintenance/tech/jobs/JobUtils";

export const useJobAcceptance = (setJobs: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { toast } = useToast();
  
  // Function to handle accepting high priority jobs
  const handleAcceptJob = (jobId: string) => {
    // Update the UI
    setJobs(prev => 
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

  return { handleAcceptJob };
};
