
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { JobCardProps } from "@/components/job/jobCardTypes";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

interface UseJobActionsProps {
  jobCards: JobCardProps[];
  setJobCards: React.Dispatch<React.SetStateAction<JobCardProps[]>>;
}

export const useJobActions = ({ jobCards, setJobCards }: UseJobActionsProps) => {
  const { toast } = useToast();
  const [isAssigning, setIsAssigning] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleAssignJob = async (jobId: string, technicianId: string, priority: string) => {
    if (isAssigning) return;
    setIsAssigning(true);

    try {
      console.log(`Assigning job ${jobId} to technician ${technicianId} with priority ${priority}`);
      
      // Add delay to ensure the UI state is updated before making the database call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // First validate that the job is still assignable
      const { data: jobData, error: jobError } = await reporterJobsTable()
        .select('*')
        .eq('id', jobId)
        .maybeSingle();
        
      if (jobError) {
        console.error("Error checking job status:", jobError);
        throw new Error("Could not verify job status");
      }
      
      if (!jobData) {
        throw new Error("Job not found");
      }
      
      if (jobData.assigned_to) {
        throw new Error("Job already assigned");
      }
      
      // Update job in Supabase with retry mechanism
      let retries = 2;
      let success = false;
      let lastError = null;
      
      while (retries > 0 && !success) {
        try {
          const { data, error } = await reporterJobsTable()
            .update({ 
              assigned_to: technicianId,
              status: 'assigned',
              priority: priority
            })
            .eq('id', jobId);
          
          if (error) {
            console.error("Supabase update error:", error);
            lastError = error;
            retries--;
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 300));
          } else {
            success = true;
            console.log("Job successfully assigned in Supabase:", data);
          }
        } catch (updateError) {
          console.error("Exception during job assignment:", updateError);
          lastError = updateError;
          retries--;
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
      if (!success) {
        throw lastError || new Error("Failed to update job after multiple attempts");
      }
      
      // Update UI by filtering out the assigned job
      setJobCards(prevCards => prevCards.filter(job => job.id !== jobId));
      
      // Trigger a refresh of job data after a small delay to ensure the database has updated
      setTimeout(() => {
        document.dispatchEvent(new Event('jobsUpdated'));
      }, 300);
      
      toast({
        title: "Job Assigned",
        description: "The job has been successfully assigned to the technician.",
      });
    } catch (error) {
      console.error("Error assigning job:", error);
      toast({
        title: "Assignment Failed",
        description: "There was an error assigning the job. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to signal failure to the dialog
    } finally {
      setIsAssigning(false);
    }
  };

  const handleResendEmail = async (jobId: string) => {
    if (isResending) return;
    setIsResending(true);

    try {
      console.log(`Resending email for job ${jobId}`);
      
      // Find the job to get details
      const job = jobCards.find(job => job.id === jobId);
      
      if (!job) {
        throw new Error("Job not found");
      }
      
      // Update notification sent status in Supabase
      const { error } = await reporterJobsTable()
        .update({ notification_sent: true })
        .eq('id', jobId);
      
      if (error) throw error;
      
      // Here you would typically call an API to send the actual email
      // For now, we're just updating the status
      
      toast({
        title: "Email Resent",
        description: "The notification email has been resent to the maintenance team.",
      });
      
      // Trigger a refresh of job data
      document.dispatchEvent(new Event('jobsUpdated'));
    } catch (error) {
      console.error("Error resending email:", error);
      toast({
        title: "Resend Failed",
        description: "There was an error resending the notification. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return {
    handleAssignJob,
    handleResendEmail,
    isAssigning,
    isResending,
  };
};
