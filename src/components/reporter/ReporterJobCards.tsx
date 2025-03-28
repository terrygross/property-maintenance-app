
import { useState } from "react";
import JobCard, { JobCardProps } from "../job/JobCard";
import { toast } from "@/hooks/use-toast";
import { MOCK_USERS } from "@/data/mockUsers";

// Mock data for job cards
const MOCK_JOB_CARDS: JobCardProps[] = [
  {
    id: "job1",
    title: "Broken HVAC Unit",
    description: "Tenant reports that the HVAC unit is not cooling properly in unit 303.",
    property: "Property A",
    reportDate: "2023-10-12",
    priority: "high",
    status: "unassigned"
  },
  {
    id: "job2",
    title: "Leaking Faucet",
    description: "Kitchen sink faucet is leaking in unit 105.",
    property: "Property B",
    reportDate: "2023-10-15",
    priority: "medium",
    status: "unassigned"
  },
  {
    id: "job3",
    title: "Light Fixture Replacement",
    description: "Hallway light fixture needs to be replaced on the 2nd floor.",
    property: "Property A",
    reportDate: "2023-10-18",
    priority: "low",
    status: "unassigned"
  },
  {
    id: "job4",
    title: "Clogged Drain",
    description: "Bathroom sink is not draining properly in unit 212.",
    property: "Property C",
    reportDate: "2023-10-10",
    priority: "medium",
    status: "unassigned"
  },
  {
    id: "job5",
    title: "Interior Painting",
    description: "Unit 115 needs complete interior repainting before new tenant move-in.",
    property: "Property B",
    reportDate: "2023-10-20",
    priority: "medium",
    status: "unassigned"
  },
  {
    id: "job6",
    title: "Electrical Short Circuit",
    description: "Outlets in the kitchen of unit 407 are not working. Potential short circuit in the wiring.",
    property: "Property A",
    reportDate: "2023-10-19",
    priority: "high",
    status: "unassigned"
  },
  {
    id: "job7",
    title: "Toilet Replacement",
    description: "Toilet in master bathroom of unit 202 is cracked and needs complete replacement.",
    property: "Property C",
    reportDate: "2023-10-17",
    priority: "high",
    status: "unassigned"
  },
  {
    id: "job8",
    title: "Ceiling Paint Peeling",
    description: "Bathroom ceiling paint is peeling in unit 305 due to moisture issues.",
    property: "Property A",
    reportDate: "2023-10-14",
    priority: "low",
    status: "unassigned"
  },
  {
    id: "job9",
    title: "Electrical Panel Inspection",
    description: "Tenant reports flickering lights throughout unit 508. Electrical panel inspection required.",
    property: "Property B",
    reportDate: "2023-10-16",
    priority: "medium",
    status: "unassigned"
  }
];

const ReporterJobCards = () => {
  const [jobCards, setJobCards] = useState<JobCardProps[]>(MOCK_JOB_CARDS);

  const handleAssignJob = (jobId: string, technicianId: string) => {
    // Find the technician to check if they're a contractor
    const technician = MOCK_USERS.find(user => user.id === technicianId);
    const isContractor = technician?.role === "contractor";
    
    // Update the job status to "assigned" and set the assignedTo field
    setJobCards(prevCards => 
      prevCards.map(card => 
        card.id === jobId 
          ? { 
              ...card, 
              status: "assigned" as const,
              assignedTo: technicianId,
              // Set emailSent to true for maintenance techs, false for contractors initially
              // In a real app, emails would be sent immediately for contractors
              emailSent: !isContractor
            } 
          : card
      )
    );

    // In a real app, this would make an API call to update the database and send email
    setTimeout(() => {
      // If it's a contractor, simulate sending an email
      if (isContractor && technician) {
        toast({
          title: "Email Sent to Contractor",
          description: `Job details have been emailed to ${technician.first_name} ${technician.last_name}.`,
        });
        
        // Update the job to mark the email as sent
        setJobCards(prevCards => 
          prevCards.map(card => 
            card.id === jobId ? { ...card, emailSent: true } : card
          )
        );
      }
      
      toast({
        title: "Job Moved to Jobs Tab",
        description: "The assigned job has been moved to the Jobs tab.",
      });
    }, 2000);
  };

  // Filter to show only unassigned jobs
  const unassignedJobs = jobCards.filter(job => job.status === "unassigned");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {unassignedJobs.length > 0 ? (
        unassignedJobs.map(job => (
          <JobCard
            key={job.id}
            {...job}
            onAssign={handleAssignJob}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">No unassigned jobs</h3>
          <p className="mt-1 text-sm text-gray-500">All jobs have been assigned to technicians.</p>
        </div>
      )}
    </div>
  );
};

export default ReporterJobCards;
