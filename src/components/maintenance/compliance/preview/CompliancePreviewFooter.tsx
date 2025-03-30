
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Printer, Save, X } from "lucide-react";

interface CompliancePreviewFooterProps {
  showOriginalFile: boolean;
  handleSave: () => void;
  handlePrint: () => void;
  onClose: () => void;
  handleDownload: () => void;
  handleOpenInNewTab: () => void;
  isMobile?: boolean;
}

const CompliancePreviewFooter = ({
  showOriginalFile,
  handleSave,
  handlePrint,
  onClose,
  handleDownload,
  handleOpenInNewTab,
  isMobile = false
}: CompliancePreviewFooterProps) => {
  // On mobile, use simplified footer with icons only
  if (isMobile) {
    return (
      <div className="flex justify-between items-center border-t pt-4 mt-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleSave}
            title="Save"
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePrint}
            title="Print"
          >
            <Printer className="h-4 w-4" />
          </Button>
          
          {showOriginalFile && (
            <>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleOpenInNewTab}
                title="Open in browser"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleDownload}
                title="Download"
              >
                <Download className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        
        <Button 
          variant="default" 
          size="icon" 
          onClick={onClose}
          title="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Desktop view with text labels
  return (
    <div className="flex justify-between items-center border-t pt-4 mt-4">
      <div className="space-x-2">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Progress
        </Button>
        
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        
        {showOriginalFile && (
          <>
            <Button variant="outline" onClick={handleOpenInNewTab}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </>
        )}
      </div>
      
      <Button variant="default" onClick={onClose}>
        <X className="h-4 w-4 mr-2" /> 
        Close
      </Button>
    </div>
  );
};

export default CompliancePreviewFooter;
