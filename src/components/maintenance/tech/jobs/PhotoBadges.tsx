
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, AlertTriangle } from "lucide-react";
import { Job } from "./JobCardTypes";

interface PhotoBadgesProps {
  job: Job;
  status: string;
  onViewReporterImage: (job: Job) => void;
}

const PhotoBadges = ({ job, status, onViewReporterImage }: PhotoBadgesProps) => {
  return (
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
      {status !== "completed" && !job.photos?.after && (
        <Badge variant="outline" className="bg-yellow-50 border-yellow-200 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3 text-yellow-500" />
          After Photo Required
        </Badge>
      )}
    </div>
  );
};

export default PhotoBadges;
