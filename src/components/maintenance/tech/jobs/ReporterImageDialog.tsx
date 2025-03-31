
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getJobPhotos } from "./utils/photoUtils";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
  photos?: {
    before?: string;
    after?: string;
    reporter?: string;
  };
}

interface ReporterImageDialogProps {
  showReporterImage: boolean;
  setShowReporterImage: (show: boolean) => void;
  selectedJob: Job | null;
}

const ReporterImageDialog = ({ 
  showReporterImage, 
  setShowReporterImage, 
  selectedJob 
}: ReporterImageDialogProps) => {
  const [reporterPhoto, setReporterPhoto] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (selectedJob) {
      // Get the latest photos when the dialog opens
      const latestPhotos = getJobPhotos(selectedJob.id);
      setReporterPhoto(latestPhotos.reporter);
    }
  }, [selectedJob, showReporterImage]);
  
  if (!selectedJob) return null;
  
  return (
    <Dialog open={showReporterImage} onOpenChange={setShowReporterImage}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reporter Photo</DialogTitle>
        </DialogHeader>
        {reporterPhoto ? (
          <div className="w-full rounded-md overflow-hidden flex justify-center">
            <img 
              src={reporterPhoto} 
              alt="Reporter photo"
              className="max-h-[70vh] object-contain"
            />
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-100 rounded-md">
            <p className="text-gray-500">No reporter photo available</p>
          </div>
        )}
        <div className="mt-2 text-sm text-gray-500">
          Photo uploaded by the reporter to help identify the issue location
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReporterImageDialog;
