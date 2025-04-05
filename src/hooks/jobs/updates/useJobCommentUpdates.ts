
import { useToast } from "@/hooks/use-toast";
import { addJobComment } from "@/components/maintenance/tech/jobs/JobUtils";

export const useJobCommentUpdates = (setJobs: React.Dispatch<React.SetStateAction<any[]>>) => {
  const { toast } = useToast();
  
  // Function to handle adding comments to jobs
  const handleAddComment = (jobId: string, comment: string) => {
    // Update the UI
    setJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          const existingComments = job.comments || [];
          return {
            ...job,
            comments: [...existingComments, comment]
          };
        }
        return job;
      })
    );
    
    // Update localStorage
    const success = addJobComment(jobId, comment);
    
    if (success) {
      toast({
        title: "Comment added",
        description: "Your note has been saved to the job.",
        variant: "default",
      });
    }
  };

  return { handleAddComment };
};
