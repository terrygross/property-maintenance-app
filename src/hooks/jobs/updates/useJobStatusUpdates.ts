
import { useToast } from "@/hooks/use-toast";
import { updateJobStatus } from "@/components/maintenance/tech/jobs/JobUtils";

export const useJobStatusUpdates = (
  jobs: any[], 
  setJobs: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const { toast } = useToast();
  
  // Function to handle updating job status
  const handleUpdateJobStatus = (jobId: string, status: string) => {
    // If trying to mark as complete, verify after photo exists
    if (status === "completed") {
      const job = jobs.find(j => j.id === jobId);
      if (!job?.photos?.after) {
        toast({
          title: "After photo required",
          description: "You must add an 'after' photo before marking this job as complete.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Update the UI
    setJobs(prev => 
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
      let message = "";
      switch(status) {
        case "in_progress":
          message = "You have marked this job as in progress.";
          break;
        case "on_hold":
          message = "You have marked this job as on hold (waiting for parts).";
          break;
        case "completed":
          message = "You have marked this job as complete.";
          break;
        default:
          message = `Job status updated to ${status}.`;
      }
      
      toast({
        title: `Status: ${status.replace('_', ' ')}`,
        description: message,
        variant: "default",
      });
      
      // Dispatch a custom event to notify other components about job updates
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
    } else if (status === "completed") {
      toast({
        title: "After photo required",
        description: "You must add an 'after' photo before marking this job as complete.",
        variant: "destructive",
      });
    }
  };

  return { handleUpdateJobStatus };
};
