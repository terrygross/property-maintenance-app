
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ComplianceList } from "./types";
import { useToast } from "@/hooks/use-toast";
import { Check, ClipboardCheck } from "lucide-react";

interface CompliancePreviewProps {
  list: ComplianceList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompliancePreview = ({ list, isOpen, onOpenChange }: CompliancePreviewProps) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
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
    toast({
      title: "Progress saved",
      description: `Saved completion status for ${list.title}`,
    });
    onOpenChange(false);
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalItems = complianceItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

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
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Compliance Checklist</h3>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ClipboardCheck className="h-3 w-3" />
              {progressPercentage}% complete
            </span>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {complianceItems.map(item => (
              <div 
                key={item.id} 
                className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center justify-center w-5 h-5 mr-3 rounded-sm border">
                  {completedItems[item.id] && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </div>
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
