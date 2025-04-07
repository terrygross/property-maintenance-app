
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "xs" | "icon";
  className?: string;
}

const ActionButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = "outline", 
  size = "sm",
  className = "" 
}: ActionButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`flex items-center gap-1 ${className}`}
    >
      <Icon className={size === "xs" ? "h-3 w-3 mr-1" : "h-3.5 w-3.5"} />
      {label}
    </Button>
  );
};

export default ActionButton;
