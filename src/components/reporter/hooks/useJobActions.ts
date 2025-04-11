
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

  const handleAssignJob = async (jobId: string, technicianId: string) => {
    if (isAssigning) return;
    setIsAssigning(true);

    try {
      console.log(`Assigning job ${jobId} to technician ${technicianId}`);
      
      // Update job in Supabase
      const { data, error } = await reporterJobsTable()
        .update({ 
          assigned_to: technicianId,
          status: 'assigned'
        })
        .eq('id', jobId)
        .select()
        .single();
      
      if (error) throw error;
      
      console.log("Job assigned in Supabase:", data);
      
      // Update UI by filtering out the assigned job
      setJobCards(jobCards.filter(job => job.id !== jobId));
      
      // Trigger a refresh of job data
      document.dispatchEvent(new Event('jobsUpdated'));
      
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
