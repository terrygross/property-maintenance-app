
import React, { useState, useEffect } from "react";
import { Bell, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighPriorityAlertProps {
  count: number;
  onClick?: () => void;
}

const HighPriorityAlert = ({ count, onClick }: HighPriorityAlertProps) => {
  const [isFlashing, setIsFlashing] = useState(true);
  
  // Create flashing effect
  useEffect(() => {
    if (count === 0) return;
    
    const interval = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 500); // Flash every 500ms
    
    return () => clearInterval(interval);
  }, [count]);
  
  if (count === 0) return null;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center p-1 rounded-full",
        "transition-colors duration-200",
        isFlashing ? "bg-red-600" : "bg-red-400",
        "animate-pulse"
      )}
    >
      <AlertCircle className="h-6 w-6 text-white" />
      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600">
        {count}
      </span>
    </button>
  );
};

export default HighPriorityAlert;
