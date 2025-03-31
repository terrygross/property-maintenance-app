
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";

// Import the smaller components
import TaskDialogHeader from "./dialog/TaskDialogHeader";
import TaskBasicFields from "./dialog/TaskBasicFields";
import TaskTechnicianSelection from "./dialog/TaskTechnicianSelection";
import TaskDialogFooter from "./dialog/TaskDialogFooter";

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
      
      resetForm();
      
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
  
  const resetForm = () => {
    setJobTitle("");
    setJobLocation("");
    setJobDescription("");
    setPriority("medium");
    setSelectedTechs([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <TaskDialogHeader />
        
        <div className="grid gap-4 py-4">
          <TaskBasicFields 
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            jobLocation={jobLocation}
            setJobLocation={setJobLocation}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            priority={priority}
            setPriority={setPriority}
            activeProperties={activeProperties}
          />
          
          <TaskTechnicianSelection 
            technicians={technicians}
            selectedTechs={selectedTechs}
            handleTechnicianSelection={handleTechnicianSelection}
          />
        </div>
        
        <TaskDialogFooter 
          onCancel={() => onOpenChange(false)} 
          onSubmit={handleCreateTask} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
