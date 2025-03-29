
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ComplianceList } from "./types";
import { useToast } from "@/hooks/use-toast";
import { Check, ClipboardCheck, Printer } from "lucide-react";

interface CompliancePreviewProps {
  list: ComplianceList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompliancePreview = ({ list, isOpen, onOpenChange }: CompliancePreviewProps) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  
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

  const handlePrint = () => {
    const printContent = document.createElement("div");
    
    if (printRef.current) {
      // Apply print styles
      printContent.innerHTML = `
        <style>
          @media print {
            body {
              font-family: Arial, sans-serif;
              color: #000;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 10px;
            }
            .completion-date {
              margin-top: 5px;
              font-size: 12px;
              color: #666;
            }
            .property-info {
              margin-bottom: 20px;
              font-size: 14px;
            }
            .checklist-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              padding: 8px;
              border-bottom: 1px solid #eee;
            }
            .checkbox {
              width: 12px;
              height: 12px;
              border: 1px solid #000;
              margin-right: 10px;
              display: inline-block;
            }
            .checked {
              background-color: #000;
            }
            .item-text {
              font-size: 14px;
            }
            .completed {
              text-decoration: line-through;
              color: #666;
            }
            .summary {
              margin-top: 30px;
              padding-top: 10px;
              border-top: 1px solid #ccc;
              font-size: 14px;
            }
          }
        </style>
        <div class="header">
          <h2>${list.title}</h2>
          <div>${list.description}</div>
          <div class="completion-date">
            Completed on: ${format(new Date(), 'MMM d, yyyy')}
          </div>
        </div>
        <div class="property-info">
          <div>Property: ${list.propertyName}</div>
          <div>Last updated: ${format(list.updatedAt, 'MMM d, yyyy')} - Version ${list.version}</div>
        </div>
      `;

      // Add checklist items
      const checklistContent = document.createElement("div");
      complianceItems.forEach(item => {
        const isCompleted = completedItems[item.id];
        checklistContent.innerHTML += `
          <div class="checklist-item">
            <span class="checkbox ${isCompleted ? 'checked' : ''}"></span>
            <span class="item-text ${isCompleted ? 'completed' : ''}">${item.text}</span>
          </div>
        `;
      });
      printContent.appendChild(checklistContent);

      // Add summary
      const completedCount = Object.values(completedItems).filter(Boolean).length;
      const totalItems = complianceItems.length;
      const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

      const summaryDiv = document.createElement("div");
      summaryDiv.className = "summary";
      summaryDiv.innerHTML = `
        <div>Completion Status: ${completedCount} of ${totalItems} items completed (${progressPercentage}%)</div>
        <div>Inspector Signature: _________________________ Date: _____________</div>
      `;
      printContent.appendChild(summaryDiv);

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = () => {
          printWindow.print();
          // Close the print window after printing (some browsers may do this automatically)
          setTimeout(() => {
            printWindow.close();
          }, 500);
        };
      }
    }

    toast({
      title: "Printing checklist",
      description: "The compliance checklist has been sent to your printer.",
    });
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
        
        <div className="py-4" ref={printRef}>
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex items-center gap-1"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
          <Button onClick={handleSave}>
            Save Progress
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompliancePreview;
