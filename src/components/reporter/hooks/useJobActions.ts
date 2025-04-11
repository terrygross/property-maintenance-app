
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { sendPushNotification, notifyTechnicianTeam } from "@/services/NotificationService";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

export const useJobActions = ({ jobCards, setJobCards }) => {
  const { toast } = useToast();
  const { users } = useAppState();
  
  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  // Function to handle assigning a job to a technician
  const handleAssignJob = async (jobId, technicianId) => {
    // Update job in Supabase
    try {
      console.log(`Assigning job ${jobId} to technician ${technicianId}`);
      
      const { data, error } = await reporterJobsTable()
        .update({
          assigned_to: technicianId,
          status: "assigned",
        })
        .eq('id', jobId)
        .select();
      
      if (error) {
        throw error;
      }
      
      console.log("Assignment update result:", data);
      
      // Check if this is a high priority job
      const job = jobCards.find(j => j.id === jobId);
      if (job && (job.priority === "high" || job.highPriority)) {
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
  const handleResendEmail = async (jobId) => {
    try {
      const { data, error } = await reporterJobsTable()
        .select('*')
        .eq('id', jobId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
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
