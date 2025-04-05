
import { useToast } from "@/hooks/use-toast";
import { updateJobPriority } from "@/components/maintenance/tech/jobs/JobUtils";

export const useJobPriorityUpdates = (setJobs: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { toast } = useToast();
  
  // Function to handle updating job priority
  const handleUpdateJobPriority = (jobId: string, priority: string) => {
    // Update the UI
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            priority: priority
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = updateJobPriority(jobId, priority);
    
    if (success) {
      toast({
        title: "Priority updated",
        description: `Job priority changed to ${priority}`,
        variant: "default",
      });
    }
  };

  return { handleUpdateJobPriority };
};
