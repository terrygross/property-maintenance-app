
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { JobCardProps } from "@/components/job/jobCardTypes";

interface UseJobActionsProps {
  jobCards: JobCardProps[];
  setJobCards: React.Dispatch<React.SetStateAction<JobCardProps[]>>;
}

export const useJobActions = ({ jobCards, setJobCards }: UseJobActionsProps) => {
  const { toast } = useToast();
  const { users } = useAppState();

  // Function to handle assigning jobs to technicians
  const handleAssignJob = (jobId: string, technicianId: string, priority: string) => {
    // Find the technician to check their role
    const technician = users.find(user => user.id === technicianId);
    const isContractor = technician?.role === "contractor";
    const isMaintenanceTech = technician?.role === "maintenance_tech";
    
    // Update the job status both in state and localStorage
    const updatedJobCards = jobCards.map(card => 
      card.id === jobId 
        ? { 
            ...card, 
            status: "assigned" as const,
            assignedTo: technicianId,
            priority: priority as "low" | "medium" | "high",
            emailSent: isContractor ? false : undefined // Only set emailSent for contractors
          } 
        : card
    );
    
    // Remove the assigned job from the jobs list
    const remainingJobs = updatedJobCards.filter(job => 
      job.status === "unassigned"
    );
    setJobCards(remainingJobs);
    
    // Update the job in localStorage
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const allJobs = JSON.parse(savedJobs);
        const updatedAllJobs = allJobs.map((job: any) => 
          job.id === jobId 
            ? { 
                ...job, 
                status: "assigned",
                assignedTo: technicianId,
                priority: priority,
                emailSent: isContractor ? false : undefined // Only set emailSent for contractors
              } 
            : job
        );
        localStorage.setItem('reporterJobs', JSON.stringify(updatedAllJobs));
      }
    } catch (error) {
      console.error("Error updating localStorage jobs:", error);
    }

    // In a real app, this would make an API call to update the database
    setTimeout(() => {
      // If it's a contractor, simulate sending an email automatically
      if (isContractor && technician) {
        toast({
          title: "Email Automatically Sent",
          description: `Job details have been automatically emailed to contractor ${technician.first_name} ${technician.last_name}.`,
        });
        
        // Update the job to mark the email as sent in localStorage
        try {
          const savedJobs = localStorage.getItem('reporterJobs');
          if (savedJobs) {
            const allJobs = JSON.parse(savedJobs);
            const updatedAllJobs = allJobs.map((job: any) => 
              job.id === jobId ? { ...job, emailSent: true } : job
            );
            localStorage.setItem('reporterJobs', JSON.stringify(updatedAllJobs));
          }
        } catch (error) {
          console.error("Error updating email sent status:", error);
        }
      }
      
      // If it's a maintenance technician, simulate sending an in-app notification
      if (isMaintenanceTech && technician) {
        toast({
          title: "App Notification Sent",
          description: `Job details have been sent to ${technician.first_name} ${technician.last_name}'s app.`,
        });
      }
      
      toast({
        title: "Job Moved to Jobs Tab",
        description: `The job has been assigned with ${priority} priority and moved to the Jobs tab.`,
      });
    }, 2000);
  };

  // Function to handle resending email to contractors
  const handleResendEmail = (jobId: string, technicianId: string) => {
    const technician = users.find(user => user.id === technicianId);
    
    if (technician?.role === "contractor") {
      toast({
        title: "Resending Email",
        description: `Resending job details to contractor ${technician.first_name} ${technician.last_name}...`,
      });
      
      // Simulate email sending
      setTimeout(() => {
        toast({
          title: "Email Resent Successfully",
          description: `Job details have been resent to ${technician.first_name} ${technician.last_name}.`,
        });
        
        // Update emailSent status in localStorage
        try {
          const savedJobs = localStorage.getItem('reporterJobs');
          if (savedJobs) {
            const allJobs = JSON.parse(savedJobs);
            const updatedAllJobs = allJobs.map((job: any) => 
              job.id === jobId ? { ...job, emailSent: true } : job
            );
            localStorage.setItem('reporterJobs', JSON.stringify(updatedAllJobs));
          }
        } catch (error) {
          console.error("Error updating email sent status:", error);
        }
      }, 2000);
    }
  };

  return {
    handleAssignJob,
    handleResendEmail
  };
};
