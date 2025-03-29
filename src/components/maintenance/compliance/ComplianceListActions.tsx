
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { RefObject } from "react";

interface ComplianceListActionsProps {
  onCreateNew: () => void;
  onFileUpload: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ComplianceListActions = ({
  onCreateNew,
  onFileUpload,
  fileInputRef,
  handleFileChange
}: ComplianceListActionsProps) => {
  return (
    <div className="flex gap-3">
      <Button 
        onClick={onCreateNew}
        className="flex items-center gap-2"
      >
        <FileText className="h-4 w-4" />
        <span>Create New</span>
      </Button>
      <Button 
        onClick={onFileUpload}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        <span>Upload File</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
      />
    </div>
  );
};

export default ComplianceListActions;
