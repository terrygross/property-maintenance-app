
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ComplianceList } from "./types";
import { useToast } from "@/hooks/use-toast";

interface ComplianceCompleteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  list: ComplianceList | null;
  onComplete: (listId: string, notes: string) => void;
}

const ComplianceComplete = ({
  isOpen,
  onOpenChange,
  list,
  onComplete,
}: ComplianceCompleteProps) => {
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();

  const handleComplete = () => {
    if (!list) {
      toast({
        title: "Error",
        description: "No compliance list selected.",
        variant: "destructive",
      });
      return;
    }

    onComplete(list.id, notes);
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Compliance List</DialogTitle>
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
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Enter any findings or notes about the inspection"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleComplete}>Mark as Completed</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceComplete;
