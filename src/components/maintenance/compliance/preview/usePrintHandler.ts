
import { useRef } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  text: string;
}

interface UsePrintHandlerProps {
  list: {
    title: string;
    description: string;
    propertyName: string;
    updatedAt: Date;
    version: number;
  };
  displayItems: ChecklistItem[];
  completedItems: Record<string, boolean>;
}

export const usePrintHandler = ({ list, displayItems, completedItems }: UsePrintHandlerProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      displayItems.forEach(item => {
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
      const totalItems = displayItems.length;
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

  return { printRef, handlePrint };
};
