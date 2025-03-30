
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ComplianceList } from "../types";
import { useToast } from "@/hooks/use-toast";
import { DialogDescription } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { StandardDialog } from "@/components/ui/dialog-components";

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
    <StandardDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title="Complete Compliance List"
      description="Mark this list as completed and add any relevant notes about your findings."
      icon={CheckCircle}
      iconClassName="text-green-500"
      maxWidth="sm:max-w-[425px]"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleComplete}>Mark as Completed</Button>
        </div>
      }
    >
      {list && (
        <div className="space-y-4">
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
      )}
    </StandardDialog>
  );
};

export default ComplianceComplete;
