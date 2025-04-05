
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  status?: string;
  comments?: string[];
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface PhotoBadgesProps {
  job: Job;
  status: string;
  onViewReporterImage: (job: Job) => void;
}

const PhotoBadges: React.FC<PhotoBadgesProps> = ({ job, status, onViewReporterImage }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {job.photos?.reporter && (
        <Badge 
          variant="outline" 
          className="bg-purple-50 flex items-center gap-1 cursor-pointer"
          onClick={() => onViewReporterImage(job)}
        >
          <Image className="h-3 w-3" />
          Reporter Photo
        </Badge>
      )}
      
      {job.photos?.before && (
        <Badge variant="outline" className="bg-blue-50 flex items-center gap-1">
          <Image className="h-3 w-3" />
          Before Photo
        </Badge>
      )}
      
      {job.photos?.after && (
        <Badge variant="outline" className="bg-green-50 flex items-center gap-1">
          <Image className="h-3 w-3" />
          After Photo
        </Badge>
      )}
      
      {status === "on_hold" && (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
          On Hold - Waiting for Parts
        </Badge>
      )}
      
      {job.comments && job.comments.length > 0 && (
        <Badge variant="outline" className="bg-gray-100 text-gray-700">
          {job.comments.length} Notes
        </Badge>
      )}
    </div>
  );
};

export default PhotoBadges;
