
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export const updateLocalStorageJobs = (jobId: string, type: "before" | "after", imageUrl: string) => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            [type === "before" ? "beforePhoto" : "afterPhoto"]: imageUrl
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
    }
  } catch (error) {
    console.error("Error updating job photos in localStorage:", error);
  }
};

export const updateJobAcceptance = (jobId: string) => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            accepted: true,
            alertShown: true // Prevent further alerts for this job
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      return true;
    }
  } catch (error) {
    console.error("Error updating job acceptance in localStorage:", error);
  }
  return false;
};

export const checkAfterPhotoForCompletion = (jobId: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const job = parsedJobs.find((job: any) => job.id === jobId);
      
      if (job && job.afterPhoto) {
        return true;
      }
    }
  } catch (error) {
    console.error("Error checking after photo for job completion:", error);
  }
  return false;
};

export const updateJobStatus = (jobId: string, status: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      
      // If trying to mark as completed, check for after photo
      if (status === "completed") {
        const job = parsedJobs.find((job: any) => job.id === jobId);
        if (job && !job.afterPhoto) {
          console.log("Cannot complete job without after photo");
          return false;
        }
      }
      
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: status
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      return true;
    }
  } catch (error) {
    console.error("Error updating job status in localStorage:", error);
  }
  return false;
};
