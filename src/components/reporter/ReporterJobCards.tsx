
import { useState, useEffect } from "react";
import JobCard from "../job/JobCard";
import { JobCardProps } from "../job/jobCardTypes";
import { useToast } from "@/hooks/use-toast";
import JobPhotosViewer from "../jobs/JobPhotosViewer";
import { useAppState } from "@/context/AppStateContext";

const ReporterJobCards = () => {
  // State to hold job cards from localStorage and mock data
  const [jobCards, setJobCards] = useState<JobCardProps[]>([]);
  const { toast } = useToast();
  const { users } = useAppState(); // Get users from AppStateContext

  // Load job cards from localStorage
  useEffect(() => {
    // First, try to load jobs from localStorage
    const loadReporterJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          // Filter out any jobs that have already been assigned
          const unassignedJobs = parsedJobs.filter((job: any) => job.status === "unassigned");
          
          // Map the jobs to include the reporter photo
          const jobsWithPhotos = unassignedJobs.map((job: any) => ({
            ...job,
            reporterPhoto: job.imageUrl // Include the imageUrl as reporterPhoto
          }));
          
          setJobCards(jobsWithPhotos);
          console.log("Loaded reporter jobs:", jobsWithPhotos);
        }
      } catch (error) {
        console.error("Error loading reporter jobs:", error);
        // If there's an error, fall back to empty array
        setJobCards([]);
      }
    };

    loadReporterJobs();
  }, []);

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
    
    // Remove the assigned job from the unassigned list
    const remainingUnassignedJobs = updatedJobCards.filter(job => job.status === "unassigned");
    setJobCards(remainingUnassignedJobs);
    
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobCards.length > 0 ? (
        jobCards.map(job => (
          <div key={job.id} className="flex flex-col space-y-4">
            <JobCard
              {...job}
              onAssign={handleAssignJob}
              onResendEmail={handleResendEmail}
            />
            <JobPhotosViewer reporterPhoto={job.reporterPhoto} />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No unassigned jobs</h3>
          <p className="mt-1 text-sm text-gray-500">All jobs have been assigned to technicians or no issues have been reported.</p>
        </div>
      )}
    </div>
  );
};

export default ReporterJobCards;
