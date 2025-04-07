
import React from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "./ActionButton";

interface ImportDataButtonProps {
  size?: "default" | "sm" | "lg" | "xs" | "icon";
}

const ImportDataButton = ({ size = "sm" }: ImportDataButtonProps) => {
  const { toast } = useToast();
  
  const handleImportData = () => {
    toast({
      title: "Import Data",
      description: "Data import functionality will be implemented here.",
    });
  };
  
  return (
    <ActionButton 
      icon={Upload} 
      label={size === "xs" ? "Import" : "Import Data"} 
      onClick={handleImportData}
      size={size}
    />
  );
};

export default ImportDataButton;
