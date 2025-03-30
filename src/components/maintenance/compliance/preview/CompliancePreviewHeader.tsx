
import { format } from "date-fns";
import { CheckCircle, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ComplianceList } from "../types";

interface CompliancePreviewHeaderProps {
  list: ComplianceList;
  showOriginalFile: boolean;
  hasAttachedFile: boolean;
  setShowOriginalFile: (show: boolean) => void;
  handleDownloadFile: () => void;
}

const CompliancePreviewHeader = ({
  list,
  showOriginalFile,
  hasAttachedFile,
  setShowOriginalFile,
  handleDownloadFile,
}: CompliancePreviewHeaderProps) => {
  return (
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
  );
};

export default CompliancePreviewHeader;
