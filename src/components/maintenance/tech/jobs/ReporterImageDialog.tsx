
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  if (!selectedJob) return null;
  
  return (
    <Dialog open={showReporterImage} onOpenChange={setShowReporterImage}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reporter Photo</DialogTitle>
        </DialogHeader>
        {selectedJob.photos?.reporter && (
          <div className="w-full rounded-md overflow-hidden flex justify-center">
            <img 
              src={selectedJob.photos.reporter} 
              alt="Reporter photo"
              className="max-h-[70vh] object-contain"
            />
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
