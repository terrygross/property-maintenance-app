
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, AlertTriangle, ShieldAlert, User } from "lucide-react";
import { Job } from "./jobsListUtils";

interface JobItemProps {
  job: Job;
  onViewDetails: () => void;
  onMarkComplete?: () => void;
  isAdmin?: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ 
  job, 
  onViewDetails, 
  onMarkComplete,
  isAdmin = false
}) => {
  // Get priority color class for badge
  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': 
      default: return 'bg-blue-500 text-white';
    }
  };

  // Format date to local string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  // Check if job can be marked complete
  const canMarkComplete = job.status !== 'completed' && 
                         (job.photos?.after || isAdmin) && 
                         onMarkComplete;

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.location}</p>
        </div>
        <Badge className={getPriorityColor(job.priority)}>
          {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
        </Badge>
      </div>
      
      {job.assignedTo && (
        <div className="mt-2 text-sm flex items-center gap-1">
          <User className="h-3 w-3 text-gray-500" /> 
          <span className="text-muted-foreground">Assigned to:</span>
          <span>{job.assignedTo}</span>
        </div>
      )}
      
      <div className="mt-2 text-sm">
        <span className="text-muted-foreground mr-2">Due:</span>
        <span>{formatDate(job.dueDate)}</span>
      </div>
      
      {job.status !== 'completed' && !job.photos?.after && (
        <div className="mt-2 flex items-center gap-1 text-muted-foreground text-xs">
          {isAdmin ? (
            <ShieldAlert className="h-3 w-3 text-amber-500" />
          ) : (
            <AlertTriangle className="h-3 w-3 text-yellow-500" /> 
          )}
          {isAdmin ? "Admin can override completion" : "Needs after photo"}
        </div>
      )}

      {job.status === 'completed' && (
        <div className="mt-2 flex items-center gap-1 text-muted-foreground text-xs">
          <CheckCircle className="h-3 w-3 text-green-500" /> 
          Completed
        </div>
      )}
      
      <div className="mt-4 flex gap-2 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onViewDetails}
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
        
        {canMarkComplete && (
          <Button 
            variant="outline"
            size="sm"
            className={isAdmin && !job.photos?.after ? "flex items-center gap-1 bg-amber-50 hover:bg-amber-100" : "flex items-center gap-1 bg-green-50 hover:bg-green-100"}
            onClick={onMarkComplete}
          >
            <CheckCircle className="h-4 w-4" />
            {isAdmin && !job.photos?.after ? "Admin Complete" : "Complete"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobItem;
