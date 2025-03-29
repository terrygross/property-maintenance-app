
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ComplianceList } from "./types";

interface CompliancePreviewProps {
  list: ComplianceList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompliancePreview = ({ list, isOpen, onOpenChange }: CompliancePreviewProps) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  
  // Mock compliance items for demonstration
  const complianceItems = [
    { id: "1", text: "Check fire extinguishers are properly charged and accessible" },
    { id: "2", text: "Inspect smoke detectors and ensure they are operational" },
    { id: "3", text: "Verify emergency exits are clearly marked and unobstructed" },
    { id: "4", text: "Test emergency lighting systems" },
    { id: "5", text: "Check HVAC filters and replace if necessary" },
  ];

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSave = () => {
    // In a real implementation, this would save the completion status
    alert("Saved compliance checklist completion status");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{list.title}</DialogTitle>
          <DialogDescription>
            {list.description}
            <div className="mt-1 text-xs">
              Last updated: {format(list.updatedAt, 'MMM d, yyyy')} - Version {list.version}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="font-medium mb-2">Compliance Checklist</h3>
          <div className="space-y-2">
            {complianceItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <input
                  type="checkbox"
                  checked={!!completedItems[item.id]}
                  onChange={() => toggleItem(item.id)}
                  className="mr-3 h-4 w-4"
                />
                <span className={completedItems[item.id] ? "line-through text-muted-foreground" : ""}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Progress
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompliancePreview;
