
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ComplianceList } from "../types";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { DialogDescription } from "@/components/ui/dialog";

interface ComplianceAssignDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  list: ComplianceList | null;
  onAssign: (listId: string, techId: string, techName: string) => void;
  technicians: User[];
}

const ComplianceAssignDialog = ({
  isOpen,
  onOpenChange,
  list,
  onAssign,
  technicians,
}: ComplianceAssignDialogProps) => {
  const [selectedTechId, setSelectedTechId] = useState<string>("");
  const { toast } = useToast();

  // Reset selected tech when dialog opens/closes or when list changes
  useEffect(() => {
    if (isOpen && list?.assignedTo) {
      setSelectedTechId(list.assignedTo);
    } else if (isOpen) {
      setSelectedTechId("");
    }
  }, [isOpen, list]);

  const handleAssign = () => {
    if (!list || !selectedTechId) {
      toast({
        title: "Error",
        description: "Please select a technician to assign this compliance list.",
        variant: "destructive",
      });
      return;
    }

    const selectedTech = technicians.find(tech => tech.id === selectedTechId);
    if (!selectedTech) {
      toast({
        title: "Error",
        description: "Selected technician not found.",
        variant: "destructive",
      });
      return;
    }

    // Create the full name for display purposes
    const techName = `${selectedTech.first_name} ${selectedTech.last_name}`;
    
    // Call the onAssign function with the list ID, technician ID, and technician name
    onAssign(list.id, selectedTechId, techName);
    
    // Close the dialog after assignment
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Compliance List</DialogTitle>
          <DialogDescription>
            Select a technician to assign this compliance list to.
          </DialogDescription>
        </DialogHeader>
        <ListInfoSection list={list} />
        <TechnicianSelector 
          technicians={technicians}
          selectedTechId={selectedTechId}
          onTechnicianChange={setSelectedTechId}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAssign}>Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component for displaying list information
const ListInfoSection = ({ list }: { list: ComplianceList | null }) => {
  if (!list) return null;
  
  return (
    <div className="space-y-2 mt-2 mb-4 p-3 bg-muted/50 rounded-md">
      <div>
        <span className="font-medium">List: </span>
        <span>{list.title}</span>
      </div>
      <div>
        <span className="font-medium">Property: </span>
        <span>{list.propertyName || "Unknown Property"}</span>
      </div>
    </div>
  );
};

// Component for technician selection
const TechnicianSelector = ({ 
  technicians, 
  selectedTechId, 
  onTechnicianChange 
}: { 
  technicians: User[], 
  selectedTechId: string, 
  onTechnicianChange: (id: string) => void 
}) => {
  const filteredTechnicians = technicians.filter(
    tech => tech.role === "maintenance_tech" || tech.role === "contractor"
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="technician">Select Technician</Label>
      <Select value={selectedTechId} onValueChange={onTechnicianChange}>
        <SelectTrigger id="technician">
          <SelectValue placeholder="Select a technician" />
        </SelectTrigger>
        <SelectContent>
          {filteredTechnicians.map(tech => (
            <SelectItem key={tech.id} value={tech.id}>
              {tech.first_name} {tech.last_name} ({tech.title})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ComplianceAssignDialog;
