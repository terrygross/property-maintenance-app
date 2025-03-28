
import { useState, useEffect } from "react";
import JobCard from "../job/JobCard";
import { JobCardProps } from "../job/jobCardTypes";
import { toast } from "@/hooks/use-toast";
import { MOCK_USERS } from "@/data/mockUsers";

// This would typically fetch from an API
const getAssignedJobs = (): Promise<JobCardProps[]> => {
  // Simulating an API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "job5",
          title: "Thermostat Replacement",
          description: "Thermostat not working in unit 401.",
          property: "Property B",
          reportDate: "2023-10-05",
          priority: "medium",
          status: "assigned",
          assignedTo: "3", // Robert Johnson (HVAC Contractor)
          emailSent: true
        },
        {
          id: "job6",
          title: "Window Repair",
          description: "Broken window in common area.",
          property: "Property A",
          reportDate: "2023-10-07",
          priority: "high",
          status: "in_progress",
          assignedTo: "5", // Michael Brown (Plumbing Contractor)
          emailSent: true
        },
        {
          id: "job10",
          title: "Hallway Painting",
          description: "Hallway on 3rd floor needs repainting after water damage repair.",
          property: "Property C",
          reportDate: "2023-10-08",
          priority: "medium",
          status: "assigned",
          assignedTo: "6", // Jason Bleakly (Plumbing Contractor)
          emailSent: false
        },
        {
          id: "job11",
          title: "Plumbing Leak Investigation",
          description: "Water stains appearing on ceiling of unit 205. Need to investigate source from unit above.",
          property: "Property B",
          reportDate: "2023-10-06",
          priority: "high",
          status: "in_progress",
          assignedTo: "7", // Mark Wilde (Electrical Contractor)
          emailSent: true
        }
      ]);
    }, 500);
  });
};

const JobsList = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const assignedJobs = await getAssignedJobs();
        setJobs(assignedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleResendEmail = (jobId: string, technicianId: string) => {
    // Find the technician
    const technician = MOCK_USERS.find(user => user.id === technicianId);
    const isContractor = technician?.role === "contractor";
    
    if (!technician) return;
    
    if (isContractor) {
      console.log(`Resending email to ${technician.first_name} ${technician.last_name} for job ${jobId}`);
      
      // Simulate sending email for contractors only
      setTimeout(() => {
        // Update job to mark email as sent
        setJobs(prevJobs => 
          prevJobs.map(job => 
            job.id === jobId ? { ...job, emailSent: true } : job
          )
        );
        
        // In a real app, this would be handled by the backend
        toast({
          title: "Email Sent Successfully",
          description: `Job details have been emailed to ${technician.first_name} ${technician.last_name}.`,
        });
      }, 1500);
    } else {
      // For maintenance techs, just show a notification that they'll see it in their app
      toast({
        title: "Notification Reminder Sent",
        description: `${technician.first_name} ${technician.last_name} will be reminded about this job in their app.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-48"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.length > 0 ? (
        jobs.map(job => (
          <JobCard 
            key={job.id} 
            {...job} 
            onResendEmail={handleResendEmail}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No assigned jobs</h3>
          <p className="mt-1 text-sm text-gray-500">There are currently no jobs assigned to technicians.</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
