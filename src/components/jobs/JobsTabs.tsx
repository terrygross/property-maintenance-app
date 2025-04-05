
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, CheckCircle } from "lucide-react";
import JobsContainer from "./JobsContainer";
import JobsSystemActions from "./JobsSystemActions";
import { Job } from "./jobsListUtils";

interface JobsTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  ongoingJobs: Job[];
  completedJobs: Job[];
  onViewDetails: (job: Job) => void;
  onMarkComplete: (jobId: string) => void;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  isAdmin?: boolean;
}

const JobsTabs = ({
  activeTab,
  setActiveTab,
  ongoingJobs,
  completedJobs,
  onViewDetails,
  onMarkComplete,
  jobs,
  setJobs,
  isAdmin = false
}: JobsTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="ongoing" className="flex items-center">
          <ClipboardList className="h-4 w-4 mr-2" />
          Ongoing Jobs ({ongoingJobs.length})
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          Completed Jobs ({completedJobs.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ongoing">
        <JobsContainer 
          jobs={ongoingJobs} 
          onViewDetails={onViewDetails}
          onMarkComplete={onMarkComplete}
          isAdmin={isAdmin}
        />
      </TabsContent>

      <TabsContent value="completed">
        <JobsSystemActions 
          jobs={jobs}
          setJobs={setJobs}
        />
        
        <JobsContainer 
          jobs={completedJobs} 
          onViewDetails={onViewDetails}
          isAdmin={isAdmin}
        />
      </TabsContent>
    </Tabs>
  );
};

export default JobsTabs;
