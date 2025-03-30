
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, AlertCircle, CheckCircle } from "lucide-react";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  accepted?: boolean;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onViewReporterImage: (job: Job) => void;
  onAcceptJob?: (jobId: string) => void;
  getPriorityColor: (priority: string) => string;
}

const JobCard = ({ 
  job, 
  onViewDetails, 
  onViewReporterImage, 
  onAcceptJob,
  getPriorityColor 
}: JobCardProps) => {
  const isHighPriority = job.priority === "high";
  const isAccepted = job.accepted;
  
  return (
    <div key={job.id} className={`border rounded-lg p-4 ${isHighPriority && !isAccepted ? 'border-red-500 bg-red-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {isHighPriority && !isAccepted && <AlertCircle className="h-4 w-4 text-red-600 animate-pulse" />}
            {isHighPriority && isAccepted && <CheckCircle className="h-4 w-4 text-green-600" />}
            <h3 className="font-medium">{job.title}</h3>
            <Badge className={getPriorityColor(job.priority)}>
              {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
            </Badge>
            {isHighPriority && isAccepted && (
              <Badge variant="outline" className="bg-green-50 border-green-200">
                Accepted
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{job.location}</p>
          <p className="text-xs mt-2">
            Due: {job.dueDate.toLocaleDateString()}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {job.photos?.reporter && (
              <Badge 
                variant="outline" 
                className="bg-purple-50 cursor-pointer"
                onClick={() => onViewReporterImage(job)}
              >
                <ImageIcon className="h-3 w-3 mr-1" />
                Reporter Photo
              </Badge>
            )}
            {job.photos?.before && (
              <Badge variant="outline" className="bg-blue-50">
                Before Photo ✓
              </Badge>
            )}
            {job.photos?.after && (
              <Badge variant="outline" className="bg-green-50">
                After Photo ✓
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {isHighPriority && !isAccepted && onAcceptJob && (
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onAcceptJob(job.id)}
              className="mb-1"
            >
              Accept Job
            </Button>
          )}
          <Button 
            size="sm" 
            variant={isHighPriority && !isAccepted ? "destructive" : "outline"} 
            onClick={() => onViewDetails(job)}
          >
            {isHighPriority && !isAccepted ? "Urgent" : "View Details"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
