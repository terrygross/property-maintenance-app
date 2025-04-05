
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, CheckCircle } from "lucide-react";
import { TechJob } from "./types";
import JobsContainer from "./JobsContainer";
import JobsDialogs from "./JobsDialogs";
import { TechJobsProvider, useTechJobs } from "./TechJobsContext";
import { getPriorityColor } from "./JobUtils";
import JobHistoryTab from "./JobHistoryTab";

interface TechJobsTabProps {
  assignedJobs: TechJob[];
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  onAcceptJob?: (jobId: string) => void;
  onUpdateStatus?: (jobId: string, status: string) => void;
  onAddComment?: (jobId: string, comment: string) => void;
  isAdmin?: boolean;
}

const TechJobsInner = () => {
  const { 
    showJobDetails, 
    setShowJobDetails, 
    showReporterImage, 
    setShowReporterImage, 
    selectedJob,
    handlePhotoCapture,
    onUpdateStatus,
    onAddComment
  } = useTechJobs();
  
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");
  
  // Filter jobs by completed status
  const completedJobs = useTechJobs().jobs.filter(job => job.status === "completed");
  const currentJobs = useTechJobs().jobs.filter(job => job.status !== "completed");

  return (
    <>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "current" | "history")} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Current Jobs ({currentJobs.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Job History ({completedJobs.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <JobsContainer jobs={currentJobs} />
        </TabsContent>
        
        <TabsContent value="history">
          <JobHistoryTab completedJobs={completedJobs} />
        </TabsContent>
      </Tabs>
      
      <JobsDialogs 
        showJobDetails={showJobDetails}
        setShowJobDetails={setShowJobDetails}
        showReporterImage={showReporterImage}
        setShowReporterImage={setShowReporterImage}
        selectedJob={selectedJob}
        getPriorityColor={getPriorityColor}
        handlePhotoCapture={handlePhotoCapture}
        handleUpdateJobStatus={onUpdateStatus}
        handleAddComment={onAddComment}
      />
    </>
  );
};

const TechJobsTab: React.FC<TechJobsTabProps> = ({ 
  assignedJobs, 
  onPhotoCapture, 
  onAcceptJob, 
  onUpdateStatus,
  onAddComment,
  isAdmin
}) => {
  return (
    <TechJobsProvider 
      assignedJobs={assignedJobs}
      onPhotoCapture={onPhotoCapture}
      onAcceptJob={onAcceptJob}
      onUpdateStatus={onUpdateStatus}
      onAddComment={onAddComment}
    >
      <div className="space-y-4">
        <TechJobsInner />
      </div>
    </TechJobsProvider>
  );
};

export default TechJobsTab;
