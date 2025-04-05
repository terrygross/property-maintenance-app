
/**
 * Hook for handling job update operations
 */
import { useState } from "react";
import { Job } from "./types";
import { useJobPhotoUpdates } from "./updates/useJobPhotoUpdates";
import { useJobStatusUpdates } from "./updates/useJobStatusUpdates";
import { useJobPriorityUpdates } from "./updates/useJobPriorityUpdates";
import { useJobCommentUpdates } from "./updates/useJobCommentUpdates";
import { useJobAcceptance } from "./updates/useJobAcceptance";
import { useJobStorageSync } from "./updates/useJobStorageSync";

export const useJobUpdates = (initialJobs: Job[]) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  
  // Use individual hooks for different job update functionalities
  const { handleJobPhotoUpdate } = useJobPhotoUpdates(setJobs);
  const { handleUpdateJobStatus } = useJobStatusUpdates(jobs, setJobs);
  const { handleUpdateJobPriority } = useJobPriorityUpdates(setJobs);
  const { handleAddComment } = useJobCommentUpdates(setJobs);
  const { handleAcceptJob } = useJobAcceptance(setJobs);
  
  // Set up storage sync
  useJobStorageSync(setJobs);
  
  return {
    jobs,
    setJobs,
    handleJobPhotoUpdate,
    handleAcceptJob,
    handleUpdateJobStatus,
    handleUpdateJobPriority,
    handleAddComment
  };
};
