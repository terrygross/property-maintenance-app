
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ComplianceChecklistProps {
  displayItems: ChecklistItem[];
  completedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  progressPercentage: number;
}

const ComplianceChecklist = ({
  displayItems,
  completedItems,
  toggleItem,
  progressPercentage
}: ComplianceChecklistProps) => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Compliance Checklist</h3>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <ClipboardCheck className="h-3 w-3" />
          {progressPercentage}% complete
        </span>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {displayItems.map(item => (
          <div 
            key={item.id} 
            className="flex items-center p-2 border rounded hover:bg-muted/50 cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <Checkbox 
              id={item.id}
              checked={completedItems[item.id]} 
              onCheckedChange={() => toggleItem(item.id)}
              className="mr-3"
            />
            <span className={completedItems[item.id] ? "line-through text-muted-foreground" : ""}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceChecklist;
