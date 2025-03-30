import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ComplianceList } from "./types";
import CompliancePreviewHeader from "./preview/CompliancePreviewHeader";
import ComplianceFileViewer from "./preview/ComplianceFileViewer";
import ComplianceChecklist from "./preview/ComplianceChecklist";
import CompliancePreviewFooter from "./preview/CompliancePreviewFooter";
import { useFileHandlers } from "./preview/useFileHandlers";
import { usePrintHandler } from "./preview/usePrintHandler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckSquare, ExternalLink } from "lucide-react";

interface CompliancePreviewProps {
  list: ComplianceList;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompliancePreview = ({ list, isOpen, onOpenChange }: CompliancePreviewProps) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  const complianceItems = list.description
    .split(/,|\n/)
    .map((item, index) => ({
      id: `item-${index}`,
      text: item.trim()
    }))
    .filter(item => item.text.length > 0);

  const displayItems = complianceItems.length > 0 
    ? complianceItems 
    : [{ id: "default", text: "No checklist items found in description. Please edit the list to add items." }];

  const fileUrl = list.fileUrl && list.fileUrl !== "#" ? list.fileUrl : "";

  const {
    hasAttachedFile,
    isPdf,
    isDocx,
    canPreviewFile,
    isLoading,
    handleOpenOriginalFile,
    handleDownloadFile
  } = useFileHandlers({ 
    fileUrl: fileUrl,
    title: list.title 
  });

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
    toast({
      title: "Progress saved",
      description: `Saved completion status for ${list.title}`,
    });
    onOpenChange(false);
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalItems = displayItems.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const defaultTab = hasAttachedFile ? "document" : "checklist";

  console.log("CompliancePreview fileUrl:", fileUrl || "No file URL provided");
  console.log("Is PDF:", isPdf);
  console.log("Can preview file:", canPreviewFile);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl h-[90vh]">
        <DialogTitle className="sr-only">{list.title} Preview</DialogTitle>
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
              <div className="flex flex-col h-full">
                {canPreviewFile ? (
                  <ComplianceFileViewer fileUrl={fileUrl} title={list.title} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-center mb-4">
                      {isDocx ? 
                        "This is a Word document that cannot be previewed directly in the browser." :
                        "This file type cannot be previewed in the browser."}
                    </p>
                    <div className="flex gap-3">
                      <button 
                        onClick={handleDownloadFile}
                        disabled={isLoading}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
                      >
                        Download Document
                      </button>
                      <button 
                        onClick={handleOpenOriginalFile}
                        className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open in New Tab
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
          handleDownload={handleDownloadFile}
          handleOpenInNewTab={handleOpenOriginalFile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CompliancePreview;
