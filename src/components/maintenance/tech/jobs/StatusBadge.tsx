
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlarmClock, AlertTriangle } from "lucide-react";
import { StatusBadgeProps } from "./JobCardTypes";

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  isHighPriority, 
  isAccepted
}) => {
  // Don't show status for unaccepted high priority jobs
  if (isHighPriority && !isAccepted) {
    return null;
  }

  switch (status) {
    case "in_progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      );
    case "on_hold":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          On Hold
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 flex items-center gap-1">
          <AlarmClock className="h-3 w-3" />
          Assigned
        </Badge>
      );
  }
};

export default StatusBadge;
