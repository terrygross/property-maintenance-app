
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ComplianceList } from "../types";
import { useToast } from "@/hooks/use-toast";
import { DialogDescription } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

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
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Complete Compliance List
          </DialogTitle>
          <DialogDescription>
            Mark this list as completed and add any relevant notes about your findings.
          </DialogDescription>
        </DialogHeader>
        <ListInfoSection list={list} />
        <NotesField 
          notes={notes} 
          setNotes={setNotes} 
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleComplete}>Mark as Completed</Button>
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

// Component for notes input
const NotesField = ({ 
  notes, 
  setNotes 
}: { 
  notes: string, 
  setNotes: (notes: string) => void 
}) => {
  return (
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
  );
};

export default ComplianceComplete;
