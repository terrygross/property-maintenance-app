
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackToOverviewButtonProps {
  activeTab: string;
  onBackClick: () => void;
}

const BackToOverviewButton = ({ activeTab, onBackClick }: BackToOverviewButtonProps) => {
  if (activeTab === "overview") return null;
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onBackClick}
      className="mb-4"
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back to Overview
    </Button>
  );
};

export default BackToOverviewButton;
