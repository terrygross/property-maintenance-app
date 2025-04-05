
import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/context/AppStateContext";
import TechJobsTab from "./jobs/TechJobsTab";
import { TechJob } from "./jobs/types";
import { useToast } from "@/hooks/use-toast";
import TechnicianInterfaceSimulation from "./TechnicianInterfaceSimulation";

const AdminTechnicianView = () => {
  const { users } = useAppState();
  const [selectedTechId, setSelectedTechId] = useState<string>("");
  const [techJobs, setTechJobs] = useState<TechJob[]>([]);
  const [activeTab, setActiveTab] = useState<string>("assigned-jobs");
  const { toast } = useToast();

  // Filter users to get only maintenance techs
  const maintenanceTechs = users.filter(
    user => user.role === "maintenance_tech" || user.role === "contractor"
  );

  // Load jobs for the selected technician
  useEffect(() => {
    if (!selectedTechId) {
      setTechJobs([]);
      return;
    }

    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        
        // Filter jobs assigned to the selected technician
        const technicianJobs = parsedJobs
          .filter((job: any) => job.assignedTo === selectedTechId)
          .map((job: any) => ({
            id: job.id,
            title: job.title || "Maintenance Request",
            location: job.property || "Unknown Location",
            description: job.description || "",
            status: job.status || "assigned",
            priority: job.priority || "medium",
            reportDate: job.reportDate || new Date().toISOString(),
            dueDate: new Date(new Date(job.reportDate).getTime() + 7 * 24 * 60 * 60 * 1000),
            photos: {
              reporter: job.imageUrl || "",
              before: job.beforePhoto || "",
              after: job.afterPhoto || ""
            },
            comments: job.comments || []
          }));
        
        setTechJobs(technicianJobs);
      }
    } catch (error) {
      console.error("Error loading technician jobs:", error);
      setTechJobs([]);
    }
  }, [selectedTechId]);

  // Handle photo capture
  const handlePhotoCapture = (jobId: string, type: "before" | "after", imageUrl: string) => {
    // Update local state
    setTechJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              photos: { 
                ...job.photos, 
                [type]: imageUrl 
              } 
            } 
          : job
      )
    );

    // Update localStorage
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        
        const updatedJobs = parsedJobs.map((job: any) => {
          if (job.id === jobId) {
            return {
              ...job,
              [type === "before" ? "beforePhoto" : "afterPhoto"]: imageUrl
            };
          }
          return job;
        });
        
        localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
        
        toast({
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} photo updated`,
          description: "The photo has been successfully updated.",
        });
      }
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  // Handle updating job status
  const handleUpdateStatus = (jobId: string, status: string) => {
    // Update local state
    setTechJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, status } 
          : job
      )
    );

    // Update localStorage
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        
        const updatedJobs = parsedJobs.map((job: any) => {
          if (job.id === jobId) {
            return {
              ...job,
              status
            };
          }
          return job;
        });
        
        localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
        
        toast({
          title: "Job status updated",
          description: `The job has been marked as ${status}.`,
        });
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  // Handle adding comments to jobs
  const handleAddComment = (jobId: string, comment: string) => {
    // Update local state
    setTechJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              comments: [...(job.comments || []), comment] 
            } 
          : job
      )
    );

    // Update localStorage
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        
        const updatedJobs = parsedJobs.map((job: any) => {
          if (job.id === jobId) {
            const existingComments = job.comments || [];
            return {
              ...job,
              comments: [...existingComments, comment]
            };
          }
          return job;
        });
        
        localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
        
        toast({
          title: "Comment added",
          description: "Your comment has been added to the job.",
        });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Maintenance Technician View</h2>
        <div className="w-64">
          <Select value={selectedTechId} onValueChange={setSelectedTechId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a technician" />
            </SelectTrigger>
            <SelectContent>
              {maintenanceTechs.map(tech => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.first_name} {tech.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedTechId ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="assigned-jobs">Assigned Jobs</TabsTrigger>
            <TabsTrigger value="technician-ui">Technician Interface</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assigned-jobs">
            <TechJobsTab 
              assignedJobs={techJobs} 
              onPhotoCapture={handlePhotoCapture}
              onUpdateStatus={handleUpdateStatus}
              onAddComment={handleAddComment}
              isAdmin={true}
            />
          </TabsContent>
          
          <TabsContent value="technician-ui">
            <TechnicianInterfaceSimulation technicianId={selectedTechId} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex items-center justify-center h-64 border rounded-md bg-gray-50">
          <p className="text-muted-foreground">Select a technician to view their jobs</p>
        </div>
      )}
    </div>
  );
};

export default AdminTechnicianView;
