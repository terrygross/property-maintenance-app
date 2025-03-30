
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

interface CompliancePreviewFooterProps {
  showOriginalFile: boolean;
  handleSave: () => void;
  handlePrint: () => void;
  onClose: () => void;
  handleDownload?: () => void;
}

const CompliancePreviewFooter = ({
  showOriginalFile,
  handleSave,
  handlePrint,
  onClose,
  handleDownload
}: CompliancePreviewFooterProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {showOriginalFile && handleDownload && (
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        )}
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
  );
};

export default CompliancePreviewFooter;
