
import React from "react";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ActionButton from "./ActionButton";

const SystemCheckButton = () => {
  const { toast } = useToast();
  
  const handleSystemCheck = () => {
    toast({
      title: "System Check",
      description: "All systems are operational.",
    });
  };
  
  return (
    <ActionButton 
      icon={RefreshCw} 
      label="Check" 
      onClick={handleSystemCheck}
      size="xs"
    />
  );
};

export default SystemCheckButton;
