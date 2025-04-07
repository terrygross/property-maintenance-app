
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Edit, Pause } from "lucide-react";
import { JobCardProps } from "./JobCardTypes";
import StatusBadge from "./StatusBadge";
import PriorityDialog from "./PriorityDialog";
import PhotoBadges from "./PhotoBadges";
import JobActionButtons from "./JobActionButtons";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const JobCard = ({ 
  job, 
  onViewDetails, 
  onViewReporterImage, 
  onAcceptJob,
  onUpdateStatus,
  onUpdatePriority,
  getPriorityColor,
  isAdmin = false
}: JobCardProps) => {
  const isHighPriority = job.priority === "high";
  const isAccepted = job.accepted;
  const isPaused = job.status === "paused";
  const status = job.status || "assigned";
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [showPriorityDialog, setShowPriorityDialog] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(job.priority);
  
  const handlePriorityChange = () => {
    if (onUpdatePriority && selectedPriority !== job.priority) {
      onUpdatePriority(job.id, selectedPriority);
      toast({
        title: "Priority updated",
        description: `Job priority changed to ${selectedPriority}`,
      });
      setShowPriorityDialog(false);
    }
  };
  
  // Comments preview for the notes box
  const commentPreview = job.comments && job.comments.length > 0 
    ? job.comments[job.comments.length - 1] 
    : null;
  
  // Calculate days paused if job is paused
  const daysPaused = isPaused && job.pausedAt ? 
    Math.floor((new Date().getTime() - new Date(job.pausedAt).getTime()) / (1000 * 3600 * 24)) : 0;
  
  return (
    <div key={job.id} className={`border rounded-lg p-3 md:p-4 ${isHighPriority && !isAccepted ? 'border-red-500 bg-red-50' : ''} ${isPaused ? 'border-amber-300 bg-amber-50' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {isHighPriority && !isAccepted && <AlertCircle className="h-4 w-4 text-red-600 animate-pulse" />}
            {isHighPriority && isAccepted && <CheckCircle className="h-4 w-4 text-green-600" />}
            {isPaused && <Pause className="h-4 w-4 text-amber-600" />}
            <h3 className="font-medium">{job.title}</h3>
            <Badge className={`${getPriorityColor(job.priority)} text-xs`}>
              {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
            </Badge>
            {isAdmin && (
              <button 
                className="h-6 w-6 p-0 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium" 
                onClick={() => setShowPriorityDialog(true)}
              >
                <Edit className="h-3 w-3" />
              </button>
            )}
            <StatusBadge status={status} isHighPriority={isHighPriority} isAccepted={isAccepted} />
          </div>
          <p className="text-sm text-muted-foreground">{job.location}</p>
          <p className="text-xs mt-2">
            Due: {job.dueDate.toLocaleDateString()}
          </p>
          
          {/* Display pause information if job is paused */}
          {isPaused && (
            <div className="mt-2 text-xs text-amber-700">
              <p>Paused: {daysPaused} {daysPaused === 1 ? 'day' : 'days'} ago</p>
              <p>Reason: {job.pausedReason || "Waiting for materials"}</p>
            </div>
          )}
          
          <PhotoBadges 
            job={job} 
            status={status} 
            onViewReporterImage={onViewReporterImage} 
          />
          
          {/* Show latest comment if exists */}
          {commentPreview && (
            <div className="mt-2 p-2 border rounded-md bg-gray-50 max-h-12 overflow-y-auto text-sm">
              <p className="text-xs font-medium text-gray-500">Latest note:</p>
              <p className="text-xs text-gray-700 line-clamp-2">{commentPreview}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-3 md:mt-0">
          {/* Photo thumbnails */}
          <div className="hidden md:flex gap-2 mr-4">
            {job.photos?.reporter && (
              <div 
                className="w-16 h-16 rounded-md overflow-hidden border bg-gray-50 cursor-pointer" 
                onClick={() => onViewReporterImage(job)}
              >
                <img 
                  src={job.photos.reporter} 
                  alt="Reporter photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {job.photos?.before && (
              <div 
                className="w-16 h-16 rounded-md overflow-hidden border bg-gray-50 cursor-pointer" 
                onClick={() => onViewDetails(job)}
              >
                <img 
                  src={job.photos.before} 
                  alt="Before photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {job.photos?.after && (
              <div 
                className="w-16 h-16 rounded-md overflow-hidden border bg-gray-50 cursor-pointer" 
                onClick={() => onViewDetails(job)}
              >
                <img 
                  src={job.photos.after} 
                  alt="After photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <JobActionButtons 
            job={job}
            isHighPriority={isHighPriority}
            isAccepted={isAccepted}
            status={status}
            onAcceptJob={onAcceptJob}
            onUpdateStatus={onUpdateStatus}
            onViewDetails={onViewDetails}
            isAdmin={isAdmin}
          />
        </div>
      </div>
      
      {/* Priority dialog */}
      <PriorityDialog 
        showPriorityDialog={showPriorityDialog}
        setShowPriorityDialog={setShowPriorityDialog}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        handlePriorityChange={handlePriorityChange}
      />
    </div>
  );
};

export default JobCard;
