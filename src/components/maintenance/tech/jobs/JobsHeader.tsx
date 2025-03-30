
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { Textarea } from "@/components/ui/textarea";

const JobsHeader: React.FC<{
  jobCount?: number;
  isAdmin?: boolean;
}> = ({ jobCount = 0, isAdmin = false }) => {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedTech, setSelectedTech] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const { toast } = useToast();
  const { users, properties } = useAppState();
  
  // Filter users to get only technicians and contractors
  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  const handleAssignJob = () => {
    if (!selectedTech || !jobTitle || !jobLocation) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get existing jobs from localStorage or initialize an empty array
      const savedJobs = localStorage.getItem('reporterJobs');
      const jobs = savedJobs ? JSON.parse(savedJobs) : [];
      
      // Create a new job
      const newJob = {
        id: `job-${Date.now()}`,
        title: jobTitle,
        property: jobLocation,
        description: jobDescription,
        priority: priority,
        status: "assigned",
        assignedTo: selectedTech,
        reportDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        emailSent: true
      };
      
      // Add the new job to the array and save it back to localStorage
      jobs.push(newJob);
      localStorage.setItem('reporterJobs', JSON.stringify(jobs));
      
      // Notify the user
      toast({
        title: "Job assigned",
        description: "The new job has been assigned successfully.",
      });
      
      // Reset form and close dialog
      setJobTitle("");
      setJobLocation("");
      setJobDescription("");
      setPriority("medium");
      setSelectedTech("");
      setShowAssignDialog(false);
      
      // Trigger a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error assigning job:", error);
      toast({
        title: "Failed to assign job",
        description: "There was an error assigning the job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Assigned Jobs {jobCount > 0 && `(${jobCount})`}</CardTitle>
        {isAdmin && (
          <Button 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setShowAssignDialog(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Assign New Job
          </Button>
        )}
      </CardHeader>
      
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign New Job</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                placeholder="Job title"
                className="col-span-3"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Select value={jobLocation} onValueChange={setJobLocation}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.name}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                placeholder="Job description"
                className="col-span-3"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technician" className="text-right">Assign To</Label>
              <Select value={selectedTech} onValueChange={setSelectedTech}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {technicians.map((tech) => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name} 
                      {tech.role === "contractor" ? " (Contractor)" : " (In-house)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button>
            <Button onClick={handleAssignJob}>Assign Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default JobsHeader;
