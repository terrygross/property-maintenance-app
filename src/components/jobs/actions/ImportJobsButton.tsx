
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useImportJobs } from "./useImportJobs";

interface ImportJobsButtonProps {
  onImport: (importedJobs: any[]) => void;
}

const ImportJobsButton = ({ onImport }: ImportJobsButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileImport } = useImportJobs(onImport);
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleImportClick}
        className="flex items-center gap-1"
      >
        <Upload className="h-4 w-4" />
        Import Job History
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".csv,.xlsx,.xls"
        onChange={handleFileImport}
      />
    </>
  );
};

export default ImportJobsButton;
