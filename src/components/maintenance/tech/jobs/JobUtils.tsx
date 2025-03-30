
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

export const updateJobPriority = (jobId: string, priority: string): boolean => {
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs);
      const updatedJobs = parsedJobs.map((job: any) => {
        if (job.id === jobId) {
          return {
            ...job,
            priority: priority
          };
        }
        return job;
      });
      localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
      return true;
    }
  } catch (error) {
    console.error("Error updating job priority in localStorage:", error);
  }
  return false;
};

export const getTechnicianJobs = (techId: string): any[] => {
  // Try to get jobs from localStorage
  try {
    const savedJobs = localStorage.getItem('reporterJobs');
    if (savedJobs) {
      const allJobs = JSON.parse(savedJobs);
      // Filter ALL jobs assigned to this technician, regardless of status
      // This ensures that both "assigned", "in_progress", and "completed" jobs are shown
      const techJobs = allJobs.filter((job: any) => job.assignedTo === techId);
      
      if (techJobs.length > 0) {
        console.log("Found jobs for technician in localStorage:", techJobs);
        return techJobs;
      }
    }
  } catch (error) {
    console.error("Error getting technician jobs from localStorage:", error);
  }
  
  // Fallback to mock data if no jobs in localStorage
  // Generate some mock jobs for the technician
  const mockJobs = [
    { 
      id: `${techId}-job1`, 
      title: "Fix heating system", 
      property: "Building A", 
      priority: "high", 
      reportDate: new Date().toISOString(),
      status: "assigned",
      assignedTo: techId,
      accepted: false
    },
    { 
      id: `${techId}-job2`, 
      title: "Replace light fixtures", 
      property: "Building C", 
      priority: "medium",
      reportDate: new Date().toISOString(),
      status: "assigned",
      assignedTo: techId
    },
    { 
      id: `${techId}-job3`, 
      title: "Inspect water damage", 
      property: "Building B", 
      priority: "low",
      reportDate: new Date().toISOString(),
      status: "assigned",
      assignedTo: techId
    }
  ];
  
  return mockJobs;
};
