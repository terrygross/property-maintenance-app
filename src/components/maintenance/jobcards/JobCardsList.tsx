
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_USERS } from "@/data/mockUsers";
import { hasAdminAccess } from "@/types/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Check } from "lucide-react";
import JobCard from "../tech/jobs/JobCard";
import { getPriorityColor, getTechnicianJobs, updateJobStatus, updateJobPriority } from "../tech/jobs/JobUtils";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";

interface JobCardsListProps {
  userRole?: string;
}

const JobCardsList = ({ userRole = "admin" }: JobCardsListProps) => {
  const { users } = useAppState();
  // Filter only in-house maintenance technicians (exclude contractors)
  const allMaintenanceTechs = users.filter(user => 
    user.role === "maintenance_tech"
  );
  
  // For Basic plan, we should only show 6 technicians
  const maintenanceTechs = allMaintenanceTechs.slice(0, 6);
  
  const [showTechJobs, setShowTechJobs] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);
  const [selectedTechName, setSelectedTechName] = useState<string>("");
  const [techJobs, setTechJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const { toast } = useToast();
  
  // State to track job updates
  const [jobsUpdated, setJobsUpdated] = useState(0);
  
  // Check if user has admin access
  const isAdminOrManager = hasAdminAccess(userRole as any);

  // Effect to refresh jobs when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed, refreshing jobs...");
      if (selectedTechId) {
        refreshTechJobs(selectedTechId);
      }
      setJobsUpdated(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('jobsUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('jobsUpdated', handleStorageChange as EventListener);
    };
  }, [selectedTechId]);

  // Function to refresh tech jobs
  const refreshTechJobs = (techId: string) => {
    const jobs = getTechnicianJobs(techId);
    
    // Format jobs for display
    const formattedJobs = jobs.map(job => ({
      id: job.id,
      title: job.title,
      location: job.property || job.location,
      priority: job.priority || "medium",
      dueDate: new Date(job.dueDate || job.reportDate || Date.now()),
      status: job.status || "assigned",
      accepted: job.accepted || false,
      photos: {
        reporter: job.imageUrl || "",
        before: job.beforePhoto || "",
        after: job.afterPhoto || ""
      }
    }));
    
    console.log("Refreshed jobs for technician:", formattedJobs);
    setTechJobs(formattedJobs);
  };

  // Handle view jobs button click
  const handleViewJobs = (techId: string) => {
    const tech = maintenanceTechs.find(t => t.id === techId);
    if (tech) {
      setSelectedTechId(techId);
      setSelectedTechName(`${tech.first_name} ${tech.last_name}`);
      
      // Get jobs for this technician
      refreshTechJobs(techId);
      setShowTechJobs(true);
    }
  };

  // Handle job status update
  const handleUpdateStatus = (jobId: string, status: string) => {
    const success = updateJobStatus(jobId, status);
    
    if (success) {
      // Update local state
      setTechJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, status } 
            : job
        )
      );
      
      toast({
        title: "Job status updated",
        description: `Job has been marked as ${status}`,
      });
    } else if (status === "completed") {
      toast({
        title: "After photo required",
        description: "The job cannot be marked as complete until the technician uploads an 'after' photo.",
        variant: "destructive",
      });
    }
  };
  
  // Handle updating job priority
  const handleUpdatePriority = (jobId: string, priority: string) => {
    const success = updateJobPriority(jobId, priority);
    
    if (success) {
      // Update local state
      setTechJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId 
            ? { ...job, priority } 
            : job
        )
      );
      
      toast({
        title: "Priority updated",
        description: `Job priority changed to ${priority}`,
      });
    }
  };
  
  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };
  
  const handleViewReporterImage = (job: any) => {
    setSelectedJob(job);
    // For simplicity, we'll just show job details dialog
    setShowJobDetails(true);
  };

  // Handle assign new job button click
  const handleAssignJob = () => {
    console.log("Assign new job clicked");
    // This is now handled in AdminDashboard
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Job Cards</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {maintenanceTechs.length}/6 technicians (Basic plan)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {maintenanceTechs.length > 0 ? (
          maintenanceTechs.map(tech => (
            <div key={tech.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{tech.first_name} {tech.last_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {tech.title} 
                    {tech.role === "contractor" && " (Contractor)"}
                  </p>
                </div>
                <Button size="sm" onClick={() => handleViewJobs(tech.id)}>View Jobs</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">No maintenance technicians found</p>
          </div>
        )}
      </div>
      
      {/* Technician Jobs Dialog */}
      <Dialog open={showTechJobs} onOpenChange={setShowTechJobs}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Jobs Assigned to {selectedTechName}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {techJobs.length > 0 ? (
              techJobs.map(job => (
                <JobCard 
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  onViewReporterImage={handleViewReporterImage}
                  onUpdateStatus={handleUpdateStatus}
                  onUpdatePriority={handleUpdatePriority}
                  getPriorityColor={getPriorityColor}
                  isAdmin={true}
                />
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No jobs assigned to this technician</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setShowTechJobs(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Job Details Dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedJob && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm">{selectedJob.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <Badge className={getPriorityColor(selectedJob.priority)}>
                      {selectedJob.priority.charAt(0).toUpperCase() + selectedJob.priority.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm">{selectedJob.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm">{selectedJob.dueDate.toLocaleDateString()}</p>
                  </div>
                </div>
                
                {/* Photos section */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Job Photos</h4>
                  
                  {/* Reporter photo */}
                  {selectedJob.photos?.reporter && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Reporter Photo:</p>
                      <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                        <img 
                          src={selectedJob.photos.reporter} 
                          alt="Reported issue" 
                          className="max-w-full max-h-60 object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Before photo */}
                  {selectedJob.photos?.before && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Before Photo:</p>
                      <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                        <img 
                          src={selectedJob.photos.before} 
                          alt="Before work" 
                          className="max-w-full max-h-60 object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* After photo */}
                  {selectedJob.photos?.after && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">After Photo:</p>
                      <div className="rounded-md overflow-hidden border max-h-60 flex items-center justify-center bg-gray-50">
                        <img 
                          src={selectedJob.photos.after} 
                          alt="After work" 
                          className="max-w-full max-h-60 object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* After photo required message */}
                  {!selectedJob.photos?.after && selectedJob.status !== "completed" && (
                    <div className="mt-2 flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-xs">Technician needs to upload an after photo before this job can be marked as complete</p>
                    </div>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex justify-between">
                  {selectedJob.status !== "completed" && selectedJob.photos?.after && (
                    <Button 
                      variant="outline" 
                      className="bg-green-50 hover:bg-green-100"
                      onClick={() => {
                        handleUpdateStatus(selectedJob.id, "completed");
                        setShowJobDetails(false);
                      }}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                  )}
                  <div className={selectedJob.status !== "completed" && selectedJob.photos?.after ? "ml-auto" : "w-full"}>
                    <Button 
                      className={selectedJob.status !== "completed" && selectedJob.photos?.after ? "" : "w-full"} 
                      onClick={() => setShowJobDetails(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobCardsList;
