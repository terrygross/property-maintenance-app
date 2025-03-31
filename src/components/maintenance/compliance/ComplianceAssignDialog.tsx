
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ComplianceList } from "./types";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

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

  // Reset selected tech when dialog opens/closes
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

    const techName = `${selectedTech.first_name} ${selectedTech.last_name}`;
    onAssign(list.id, selectedTechId, techName);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Compliance List</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {list && (
            <div className="space-y-2">
              <div>
                <span className="font-medium">List: </span>
                <span>{list.title}</span>
              </div>
              <div>
                <span className="font-medium">Property: </span>
                <span>{list.propertyName}</span>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="technician">Select Technician</Label>
            <Select value={selectedTechId} onValueChange={setSelectedTechId}>
              <SelectTrigger id="technician">
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {technicians
                  .filter(tech => tech.role === "maintenance_tech" || tech.role === "contractor")
                  .map(tech => (
                    <SelectItem key={tech.id} value={tech.id}>
                      {tech.first_name} {tech.last_name} ({tech.title})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAssign}>Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceAssignDialog;
