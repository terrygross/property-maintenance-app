
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppState } from "@/context/AppStateContext";

interface AssignJobDialogProps {
  jobId: string;
  priority: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (id: string, technicianId: string, priority: string) => void;
}

const AssignJobDialog = ({ 
  jobId, 
  priority: initialPriority, 
  open, 
  onOpenChange, 
  onAssign 
}: AssignJobDialogProps) => {
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>(initialPriority);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { users } = useAppState();

  // Filter technicians (maintenance_tech) and contractors
  const technicians = users.filter(
    user => user.role === "maintenance_tech" || user.role === "contractor"
  );

  // Reset selected technician when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedTechnician("");
      setSelectedPriority(initialPriority);
      setIsSubmitting(false);
    }
  }, [open, initialPriority]);

  const handleAssign = async () => {
    if (selectedTechnician && !isSubmitting) {
      setIsSubmitting(true);
      
      try {
        // Call the onAssign function
        await onAssign(jobId, selectedTechnician, selectedPriority);
        
        // Close the dialog after successful assignment
        onOpenChange(false);
      } catch (error) {
        console.error("Error in handleAssign:", error);
        // Dialog stays open on error (error toast is shown by parent component)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Prevent closing dialog during submission
      if (isSubmitting && !newOpen) return;
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Job</DialogTitle>
          <DialogDescription>
            Select a technician or contractor to assign this job to.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="technician">Technician or Contractor</Label>
            <Select 
              value={selectedTechnician} 
              onValueChange={setSelectedTechnician}
              disabled={isSubmitting}
            >
              <SelectTrigger id="technician">
                <SelectValue placeholder="Select technician" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {technicians.map(tech => (
                  <SelectItem key={tech.id} value={tech.id}>
                    {tech.first_name} {tech.last_name} ({tech.role === "contractor" ? "Contractor" : "Technician"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup 
              defaultValue={initialPriority}
              value={selectedPriority}
              onValueChange={setSelectedPriority}
              className="flex space-x-2"
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-green-500 font-medium">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-amber-500 font-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-red-500 font-medium">High</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            onClick={handleAssign}
            disabled={!selectedTechnician || isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignJobDialog;
