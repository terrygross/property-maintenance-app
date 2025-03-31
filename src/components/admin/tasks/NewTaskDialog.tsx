
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technicians: any[];
  properties: Property[];
}

const NewTaskDialog = ({ open, onOpenChange, technicians, properties }: NewTaskDialogProps) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const { toast } = useToast();
  
  // Filter to only show active properties in the dropdown
  const activeProperties = properties.filter(property => property.status === "active");
  
  // Set a default property when dialog opens, if available
  useEffect(() => {
    if (open && activeProperties.length > 0 && !jobLocation) {
      setJobLocation(activeProperties[0].name);
    }
  }, [open, activeProperties, jobLocation]);

  const handleTechnicianSelection = (techId: string) => {
    setSelectedTechs(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  const handleCreateTask = () => {
    if (!jobTitle || !jobLocation || selectedTechs.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select at least one technician.",
        variant: "destructive",
      });
      return;
    }

    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      const jobs = savedJobs ? JSON.parse(savedJobs) : [];
      
      selectedTechs.forEach(techId => {
        const newJob = {
          id: `job-${Date.now()}-${techId}`,
          title: jobTitle,
          property: jobLocation,
          description: jobDescription,
          priority: priority,
          status: "assigned",
          assignedTo: techId,
          reportDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          emailSent: true
        };
        
        jobs.push(newJob);
      });
      
      localStorage.setItem('reporterJobs', JSON.stringify(jobs));
      
      toast({
        title: "Task created",
        description: `The new task has been assigned to ${selectedTechs.length} technician(s).`,
      });
      
      setJobTitle("");
      setJobLocation("");
      setJobDescription("");
      setPriority("medium");
      setSelectedTechs([]);
      onOpenChange(false);
      
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
      
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Failed to create task",
        description: "There was an error creating the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Maintenance Task</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              placeholder="Task title"
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
                {activeProperties.length > 0 ? (
                  activeProperties.map((property) => (
                    <SelectItem key={property.id} value={property.name}>
                      {property.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="No active properties" disabled>
                    No active properties available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              placeholder="Task description"
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
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Assign To</Label>
            <div className="col-span-3 border rounded-md p-3 space-y-2">
              <p className="text-sm text-muted-foreground mb-2">
                Select one or more technicians to assign this task to:
              </p>
              {technicians.map((tech) => (
                <div key={tech.id} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id={`tech-${tech.id}`} 
                    checked={selectedTechs.includes(tech.id)}
                    onChange={() => handleTechnicianSelection(tech.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={`tech-${tech.id}`} className="text-sm">
                    {tech.first_name} {tech.last_name} 
                    {tech.role === "contractor" ? " (Contractor)" : " (In-house)"}
                  </label>
                </div>
              ))}
              {technicians.length === 0 && (
                <p className="text-sm text-muted-foreground">No technicians available</p>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
