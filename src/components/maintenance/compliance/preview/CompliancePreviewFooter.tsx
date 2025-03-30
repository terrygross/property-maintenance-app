
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface CompliancePreviewFooterProps {
  showOriginalFile: boolean;
  handleSave: () => void;
  handlePrint: () => void;
  onClose: () => void;
}

const CompliancePreviewFooter = ({
  showOriginalFile,
  handleSave,
  handlePrint,
  onClose
}: CompliancePreviewFooterProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
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
  );
};

export default CompliancePreviewFooter;
