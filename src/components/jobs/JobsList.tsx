
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import JobPhotosViewer from "./JobPhotosViewer";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Image } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const { toast } = useToast();
  const { users } = useAppState();
  
  // Load jobs from localStorage on component mount
  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        // Filter to only show assigned jobs
        const assignedJobs = parsedJobs.filter((job: any) => job.status === "assigned");
        
        // Format the jobs to match our component's expected structure
        const formattedJobs = assignedJobs.map((job: any) => {
          // Find the assigned technician
          const assignedTech = job.assignedTo ? 
            users.find((user: any) => user.id === job.assignedTo) : null;
          
          return {
            id: job.id,
            title: job.title,
            location: job.property,
            priority: job.priority || "medium",
            status: job.status,
            assignedTo: assignedTech ? 
              `${assignedTech.first_name} ${assignedTech.last_name}` : 
              "Unassigned",
            techRole: assignedTech?.role || "",
            emailSent: job.emailSent || false,
            dueDate: new Date(new Date(job.reportDate).getTime() + 7 * 24 * 60 * 60 * 1000),
            photos: { 
              reporter: job.imageUrl,
              before: job.beforePhoto || "",
              after: job.afterPhoto || ""
            }
          };
        });
        
        setJobs(formattedJobs);
      }
    } catch (error) {
      console.error("Error loading assigned jobs:", error);
    }
  }, [users]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "assigned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{job.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full text-white ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                      <p className="text-xs mt-1">Assigned to: {job.assignedTo}</p>
                      <p className="text-xs">Due: {job.dueDate.toLocaleDateString()}</p>
                      
                      {/* Email status badge for contractors */}
                      {job.techRole === "contractor" && (
                        <div className="mt-2">
                          <Badge 
                            variant={job.emailSent ? "outline" : "secondary"} 
                            className="flex items-center gap-1 text-xs"
                          >
                            <Mail className="h-3 w-3" />
                            {job.emailSent ? "Email Sent" : "Email Pending"}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(job)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    {/* Reporter photo thumbnail with increased size */}
                    {job.photos?.reporter && (
                      <div className="flex items-center justify-center ml-4 h-full">
                        <div className="h-32 w-32 rounded-md overflow-hidden border flex-shrink-0">
                          <img 
                            src={job.photos.reporter} 
                            alt="Reporter" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No assigned jobs yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job details dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <p className="text-sm">{selectedJob.priority}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm">{selectedJob.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Assigned To</p>
                  <p className="text-sm">{selectedJob.assignedTo}</p>
                  
                  {/* Email status for contractors */}
                  {selectedJob.techRole === "contractor" && (
                    <Badge 
                      variant={selectedJob.emailSent ? "outline" : "secondary"} 
                      className="mt-1 flex items-center gap-1 text-xs"
                    >
                      <Mail className="h-3 w-3" />
                      {selectedJob.emailSent ? "Email Sent" : "Email Pending"}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm">{selectedJob.dueDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Photo viewer component */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Job Photos</h4>
                <JobPhotosViewer 
                  reporterPhoto={selectedJob.photos?.reporter}
                  beforePhoto={selectedJob.photos?.before}
                  afterPhoto={selectedJob.photos?.after}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setShowJobDetails(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobsList;
