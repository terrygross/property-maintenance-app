import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { sendPushNotification, notifyTechnicianTeam } from "@/services/NotificationService";

export const useJobActions = ({ jobCards, setJobCards }) => {
  const { toast } = useToast();
  const { users } = useAppState();
  
  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  // Function to handle assigning a job to a technician
  const handleAssignJob = (jobId, technicianId) => {
    // Update job in localStorage
    try {
      const savedJobs = localStorage.getItem("reporterJobs");
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        
        const updatedJobs = parsedJobs.map((job) => {
          if (job.id === jobId) {
            const assignedJob = {
              ...job,
              assignedTo: technicianId,
              status: "assigned",
              assignedDate: new Date().toISOString(),
            };
            
            // Check if this is a high priority job
            if (job.priority === "high") {
              // Find the technician details to get their phone number
              const technician = users.find(user => user.id === technicianId);
              
              // Send notification to the specific technician assigned
              if (technician && technician.phone) {
                const title = "⚠️ HIGH PRIORITY JOB ASSIGNED";
                const message = `You have been assigned a high priority job: ${job.title}`;
                sendPushNotification(title, { 
                  body: message,
                  requireInteraction: true
                });
              }
            }
            
            return assignedJob;
          }
          return job;
        });
        
        localStorage.setItem("reporterJobs", JSON.stringify(updatedJobs));
        
        // Update local state to remove assigned job
        setJobCards(jobCards.filter((job) => job.id !== jobId));
        
        // Show success message
        toast({
          title: "Job assigned",
          description: "The job has been successfully assigned.",
        });
        
        // Dispatch custom event to notify other components
        document.dispatchEvent(new Event("jobsUpdated"));
        
        return true;
      }
    } catch (error) {
      console.error("Error assigning job:", error);
      
      toast({
        title: "Error",
        description: "There was an error assigning the job.",
        variant: "destructive",
      });
    }
    
    return false;
  };

  // Function to handle resending email for a job
  const handleResendEmail = (jobId) => {
    try {
      const savedJobs = localStorage.getItem("reporterJobs");
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        
        const jobToResend = parsedJobs.find((job) => job.id === jobId);
        
        if (jobToResend) {
          // Mock email resend (replace with actual email service integration)
          console.log(`[MOCK] Resending email for job ${jobId} to reporter`);
          
          toast({
            title: "Email resent",
            description: "The email has been resent to the reporter.",
          });
          
          return true;
        } else {
          toast({
            title: "Error",
            description: "Job not found.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error resending email:", error);
      
      toast({
        title: "Error",
        description: "There was an error resending the email.",
        variant: "destructive",
      });
    }
    
    return true;
  };

  return { handleAssignJob, handleResendEmail };
};
