
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ComplianceList } from "./types";
import { useToast } from "@/hooks/use-toast";
import { Check, ClipboardCheck, Printer, FileText, Download, ExternalLink, CheckCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CompliancePreviewProps {
  list: ComplianceList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompliancePreview = ({ list, isOpen, onOpenChange }: CompliancePreviewProps) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [showOriginalFile, setShowOriginalFile] = useState(false);
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLIFrameElement>(null);
  
  // Parse list description content into compliance items
  // First try to split by commas, if that doesn't work well, split by new lines
  const complianceItems = list.description
    .split(/,|\n/)
    .map((item, index) => ({
      id: `item-${index}`,
      text: item.trim()
    }))
    .filter(item => item.text.length > 0); // Filter out empty items
  
  // If no items could be parsed from description, provide a default placeholder item
  const displayItems = complianceItems.length > 0 
    ? complianceItems 
    : [{ id: "default", text: "No checklist items found in description. Please edit the list to add items." }];

  // Handle file URL detection - check if the list has a fileUrl property
  const hasAttachedFile = !!list.fileUrl && list.fileUrl.length > 0;
  const fileExtension = hasAttachedFile ? list.fileUrl.split('.').pop()?.toLowerCase() : '';
  const isPdf = fileExtension === 'pdf';
  const isDocx = fileExtension === 'docx' || fileExtension === 'doc';
  const canPreviewFile = isPdf; // Only PDFs can be viewed in iframe reliably

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

  const handleOpenOriginalFile = () => {
    if (hasAttachedFile) {
      if (canPreviewFile) {
        setShowOriginalFile(true);
      } else {
        // For non-previewable files, open in a new tab or download
        window.open(list.fileUrl, '_blank');
      }
    }
  };

  const handleDownloadFile = () => {
    if (hasAttachedFile) {
      const link = document.createElement('a');
      link.href = list.fileUrl;
      link.download = `${list.title}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "File downloading",
        description: `Downloading ${list.title}.${fileExtension}`,
      });
    }
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalItems = displayItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={showOriginalFile && isPdf ? "sm:max-w-3xl h-[90vh]" : "sm:max-w-md"}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{list.title}</span>
            {hasAttachedFile && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowOriginalFile(!showOriginalFile)}
                  className="flex items-center gap-1 text-xs"
                >
                  {showOriginalFile ? <CheckCircle className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                  {showOriginalFile ? "Show Checklist" : "View Original"}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleDownloadFile}
                  className="flex items-center gap-1 text-xs"
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            {!showOriginalFile && (
              <>
                {list.description}
                <div className="mt-1 text-xs">
                  Last updated: {format(list.updatedAt, 'MMM d, yyyy')} - Version {list.version}
                </div>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        
        {showOriginalFile && isPdf ? (
          <div className="flex-1 w-full h-full min-h-[500px]">
            <iframe 
              ref={fileRef}
              src={list.fileUrl} 
              className="w-full h-full border rounded"
              title={list.title}
            />
          </div>
        ) : (
          <div className="py-4" ref={printRef}>
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
        )}
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {!showOriginalFile && (
              <Button 
                variant="outline" 
                onClick={handlePrint}
                className="flex items-center gap-1"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
            )}
          </div>
          {!showOriginalFile && (
            <Button onClick={handleSave}>
              Save Progress
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompliancePreview;
