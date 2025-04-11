
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
  
  useEffect(() => {
    console.log("HighPriorityAlert - Alert count updated:", count);
  }, [count]);
  
  if (count === 0) {
    console.log("HighPriorityAlert - Zero count, not rendering");
    return null;
  }
  
  console.log("HighPriorityAlert - Rendering with count:", count);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center p-2 rounded-full",
        "transition-colors duration-200",
        isFlashing ? "bg-red-600" : "bg-red-400",
        "animate-pulse hover:bg-red-700",
        "shadow-lg", // Add shadow for more emphasis
        "h-12 w-12", // Increased size for visibility
        "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      )}
      aria-label={`${count} high priority alerts`}
    >
      <AlertCircle className="h-7 w-7 text-white" />
      <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600 border border-red-600 shadow">
        {count}
      </span>
    </button>
  );
};

export default HighPriorityAlert;
