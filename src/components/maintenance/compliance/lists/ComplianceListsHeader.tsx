
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { RefObject } from "react";
import ComplianceListActions from "../ComplianceListActions";

interface ComplianceListsHeaderProps {
  onCreateNew: () => void;
  onFileUpload: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ComplianceListsHeader = ({
  onCreateNew,
  onFileUpload,
  fileInputRef,
  handleFileChange
}: ComplianceListsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold">Compliance Lists</h2>
        <p className="text-muted-foreground">
          Manage property-specific maintenance compliance checklists
        </p>
      </div>
      <ComplianceListActions
        onCreateNew={onCreateNew}
        onFileUpload={onFileUpload}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default ComplianceListsHeader;
