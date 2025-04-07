
import React from "react";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "./ActionButton";

interface ExportDataButtonProps {
  size?: "default" | "sm" | "lg" | "xs" | "icon";
}

const ExportDataButton = ({ size = "sm" }: ExportDataButtonProps) => {
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Data export functionality will be implemented here.",
    });
  };
  
  return (
    <ActionButton 
      icon={Download} 
      label={size === "xs" ? "Export" : "Export Data"} 
      onClick={handleExportData}
      size={size}
    />
  );
};

export default ExportDataButton;
