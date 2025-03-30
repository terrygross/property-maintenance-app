
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ImageIcon, Check } from "lucide-react";
import { getPriorityColor, getStatusBadge, Job } from "./jobsListUtils";

interface JobItemProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onMarkComplete?: (jobId: string) => void;
}

const JobItem: React.FC<JobItemProps> = ({ job, onViewDetails, onMarkComplete }) => {
  const isCompleted = job.status === "completed";
  const hasAfterPhoto = Boolean(job.photos?.after);
  
  const handleMarkComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkComplete) {
      onMarkComplete(job.id);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between h-full">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{job.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full text-white ${getPriorityColor(job.priority)}`}>
              {job.priority}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(job.status)}`}>
              {job.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{job.location}</p>
          <p className="text-xs mt-1">Assigned to: {job.assignedTo}</p>
          <p className="text-xs">Due: {job.dueDate.toLocaleDateString()}</p>
          
          {/* Email status badge for contractors */}
          {job.techRole === "contractor" && (
            <div className="mt-2">
              <Badge 
                variant={job.emailSent ? "outline" : "secondary"} 
                className="flex items-center gap-1 text-xs"
              >
                <Mail className="h-3 w-3" />
                {job.emailSent ? "Email Sent" : "Email Pending"}
              </Badge>
            </div>
          )}
          
          {/* Photo badges */}
          <div className="mt-2 flex flex-wrap gap-2">
            {job.photos?.reporter && (
              <Badge variant="outline" className="bg-purple-50 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Reporter Photo
              </Badge>
            )}
            {job.photos?.before && (
              <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                Before Photo
              </Badge>
            )}
            {job.photos?.after && (
              <Badge variant="outline" className="bg-green-50 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                After Photo
              </Badge>
            )}
          </div>
          
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onViewDetails(job)}>
              View Details
            </Button>
            
            {!isCompleted && hasAfterPhoto && onMarkComplete && (
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-green-50 hover:bg-green-100"
                onClick={handleMarkComplete}
              >
                <Check className="h-4 w-4 mr-1" />
                Mark Complete
              </Button>
            )}
          </div>
        </div>
        
        {/* Reporter photo thumbnail */}
        {job.photos?.reporter && (
          <div className="flex items-center justify-center ml-4 h-full">
            <div className="h-32 w-32 rounded-md overflow-hidden border flex-shrink-0">
              <img 
                src={job.photos.reporter} 
                alt="Reporter" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobItem;
