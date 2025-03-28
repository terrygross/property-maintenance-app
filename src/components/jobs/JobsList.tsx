
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import JobPhotosViewer from "./JobPhotosViewer";

const JobsList = () => {
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const { toast } = useToast();
  
  // Mock job data with photo fields similar to the technician's view
  const [jobs, setJobs] = useState([
    { 
      id: "j1", 
      title: "Fix heating system", 
      location: "Building A", 
      priority: "high", 
      status: "in-progress",
      assignedTo: "John Doe",
      dueDate: new Date(2023, 11, 30),
      photos: { before: "", after: "" }
    },
    { 
      id: "j2", 
      title: "Replace light fixtures", 
      location: "Building C", 
      priority: "medium", 
      status: "completed",
      assignedTo: "Jane Smith",
      dueDate: new Date(2023, 12, 5),
      photos: { before: "/images/before-light.jpg", after: "/images/after-light.jpg" }
    },
    { 
      id: "j3", 
      title: "Inspect water damage", 
      location: "Building B", 
      priority: "low", 
      status: "assigned",
      assignedTo: "Mike Johnson",
      dueDate: new Date(2023, 12, 10),
      photos: { before: "/images/water-damage.jpg", after: "" }
    },
  ]);

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
            {jobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{job.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(job.priority)}`}>
                        {job.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <p className="text-xs mt-1">Assigned to: {job.assignedTo}</p>
                    <p className="text-xs">Due: {job.dueDate.toLocaleDateString()}</p>
                    
                    {/* Display indicators for photos */}
                    <div className="mt-2 flex gap-2">
                      {job.photos?.before && (
                        <span className="text-xs bg-blue-50 px-2 py-1 rounded">Before Photo ✓</span>
                      )}
                      {job.photos?.after && (
                        <span className="text-xs bg-green-50 px-2 py-1 rounded">After Photo ✓</span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(job)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
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
