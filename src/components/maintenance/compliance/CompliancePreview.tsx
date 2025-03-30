
import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ComplianceList } from "./types";
import CompliancePreviewHeader from "./preview/CompliancePreviewHeader";
import ComplianceFileViewer from "./preview/ComplianceFileViewer";
import ComplianceChecklist from "./preview/ComplianceChecklist";
import CompliancePreviewFooter from "./preview/CompliancePreviewFooter";
import { useFileHandlers } from "./preview/useFileHandlers";
import { usePrintHandler } from "./preview/usePrintHandler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckSquare } from "lucide-react";

interface CompliancePreviewProps {
  list: ComplianceList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompliancePreview = ({ list, isOpen, onOpenChange }: CompliancePreviewProps) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
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

  const {
    hasAttachedFile,
    isPdf,
    isDocx,
    canPreviewFile,
    handleDownloadFile
  } = useFileHandlers({ fileUrl: list.fileUrl, title: list.title });

  const { printRef, handlePrint } = usePrintHandler({ 
    list: {
      title: list.title,
      description: list.description,
      propertyName: list.propertyName || "Unknown Property",
      updatedAt: new Date(list.updatedAt),
      version: list.version || 1
    }, 
    displayItems, 
    completedItems 
  });

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
  const totalItems = displayItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Default tab - show document if available, otherwise show checklist
  const defaultTab = hasAttachedFile ? "document" : "checklist";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl h-[90vh]">
        <CompliancePreviewHeader data={list} />
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            {hasAttachedFile && (
              <TabsTrigger value="document" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Document</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="checklist" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              <span>Checklist</span>
            </TabsTrigger>
          </TabsList>

          {hasAttachedFile && (
            <TabsContent value="document" className="h-[60vh]">
              {canPreviewFile ? (
                <ComplianceFileViewer fileUrl={list.fileUrl} title={list.title} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-center mb-4">
                    {isDocx ? 
                      "This is a Word document that cannot be previewed directly in the browser." :
                      "This file type cannot be previewed in the browser."}
                  </p>
                  <button 
                    onClick={handleDownloadFile}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                  >
                    Download Document
                  </button>
                </div>
              )}
            </TabsContent>
          )}
          
          <TabsContent value="checklist">
            <div ref={printRef}>
              <ComplianceChecklist
                displayItems={displayItems}
                completedItems={completedItems}
                toggleItem={toggleItem}
                progressPercentage={progressPercentage}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <CompliancePreviewFooter
          showOriginalFile={hasAttachedFile}
          handleSave={handleSave}
          handlePrint={handlePrint}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CompliancePreview;
