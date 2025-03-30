
import { Button } from "@/components/ui/button";
import { Download, Printer, Save, X, ExternalLink } from "lucide-react";

interface CompliancePreviewFooterProps {
  showOriginalFile: boolean;
  handleSave: () => void;
  handlePrint: () => void;
  onClose: () => void;
  handleDownload?: () => void;
  handleOpenInNewTab?: () => void;
}

const CompliancePreviewFooter = ({
  showOriginalFile,
  handleSave,
  handlePrint,
  onClose,
  handleDownload,
  handleOpenInNewTab
}: CompliancePreviewFooterProps) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mt-6">
      <div className="flex flex-wrap items-center gap-2">
        {showOriginalFile && handleDownload && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
        )}
        
        {showOriginalFile && handleOpenInNewTab && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleOpenInNewTab}
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open in New Tab</span>
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePrint}
          className="flex items-center gap-1"
        >
          <Printer className="h-4 w-4" />
          <span>Print</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="default" 
          size="sm"
          onClick={handleSave}
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          <span>Save & Close</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClose}
          className="flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          <span>Cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default CompliancePreviewFooter;
