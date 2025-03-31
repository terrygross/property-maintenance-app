
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";
import { StatusBadgeProps } from "./JobCardTypes";

const StatusBadge = ({ status, isHighPriority, isAccepted }: StatusBadgeProps) => {
  if (status === "in_progress") {
    return (
      <Badge variant="outline" className="bg-blue-50 border-blue-200 flex items-center gap-1">
        <Clock className="h-3 w-3 text-blue-500" />
        In Progress
      </Badge>
    );
  }
  
  if (status === "completed") {
    return (
      <Badge variant="outline" className="bg-green-50 border-green-200 flex items-center gap-1">
        <Check className="h-3 w-3 text-green-500" />
        Completed
      </Badge>
    );
  }
  
  // Show accepted badge only if it's high priority and accepted
  if (isHighPriority && isAccepted) {
    return (
      <Badge variant="outline" className="bg-green-50 border-green-200">
        Accepted
      </Badge>
    );
  }
  
  return null;
};

export default StatusBadge;
