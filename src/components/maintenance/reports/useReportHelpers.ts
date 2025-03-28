
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/mockProperties";

export const useReportHelpers = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getPropertyName = (propId: string) => {
    if (propId === "all") return "All Properties";
    
    const property = mockProperties.find(p => p.id === propId);
    return property ? property.name : propId;
  };

  const getReportTypeName = (type: string) => {
    const types: Record<string, string> = {
      maintenance: "Maintenance Categories",
      response: "Response Time",
      cost: "Cost Analysis",
      satisfaction: "Tenant Satisfaction"
    };
    return types[type] || type;
  };

  const getDateRangeName = (range: string) => {
    const ranges: Record<string, string> = {
      "30days": "Last 30 Days",
      "90days": "Last 90 Days",
      "ytd": "Year to Date",
      "custom": "Custom Range"
    };
    return ranges[range] || range;
  };

  const handleDownloadExcel = () => {
    toast({
      title: "Excel Download Started",
      description: `Downloading the report as Excel.`,
    });
    
    setTimeout(() => {
      toast({
        title: "Excel Download Complete",
        description: "Your report has been downloaded successfully.",
      });
    }, 1500);
  };

  const handleDownloadReport = () => {
    toast({
      title: "PDF Download Started",
      description: `Downloading the report as PDF.`,
    });
    
    setTimeout(() => {
      toast({
        title: "PDF Download Complete",
        description: "Your report has been downloaded successfully.",
      });
    }, 1500);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Uploading Excel File",
        description: `${file.name} is being processed...`,
      });

      setTimeout(() => {
        toast({
          title: "Excel File Uploaded",
          description: `${file.name} has been successfully processed and data has been updated.`,
        });
        
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
    }
  };

  return {
    fileInputRef,
    getPropertyName,
    getReportTypeName,
    getDateRangeName,
    handleDownloadExcel,
    handleDownloadReport,
    handleUploadClick,
    handleFileUpload
  };
};
