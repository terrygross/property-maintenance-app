
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Edit } from "lucide-react";
import { JobCardProps } from "./JobCardTypes";
import StatusBadge from "./StatusBadge";
import PriorityDialog from "./PriorityDialog";
import PhotoBadges from "./PhotoBadges";
import JobActionButtons from "./JobActionButtons";
import { useToast } from "@/hooks/use-toast";

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
  const status = job.status || "assigned";
  const { toast } = useToast();
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
  
  return (
    <div key={job.id} className={`border rounded-lg p-4 ${isHighPriority && !isAccepted ? 'border-red-500 bg-red-50' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            {isHighPriority && !isAccepted && <AlertCircle className="h-4 w-4 text-red-600 animate-pulse" />}
            {isHighPriority && isAccepted && <CheckCircle className="h-4 w-4 text-green-600" />}
            <h3 className="font-medium">{job.title}</h3>
            <Badge className={getPriorityColor(job.priority)}>
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
          
          <PhotoBadges 
            job={job} 
            status={status} 
            onViewReporterImage={onViewReporterImage} 
          />
        </div>
        
        {job.photos?.reporter && (
          <div className="hidden md:block w-16 h-16 rounded-md overflow-hidden border bg-gray-50 mr-4 cursor-pointer" 
               onClick={() => onViewReporterImage(job)}>
            <img 
              src={job.photos.reporter} 
              alt="Reporter photo" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
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
