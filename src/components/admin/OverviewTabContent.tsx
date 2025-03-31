
import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import JobsList from "../jobs/JobsList";
import DashboardActions from "./dashboard/DashboardActions";
import { Dispatch, SetStateAction } from "react";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";

interface OverviewTabContentProps {
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const highPriorityJobs = useHighPriorityJobsMonitor();

  const handleAlertClick = () => {
    if (setActiveTab) {
      setActiveTab("reporter");
    }
  };

  const handleNewTaskClick = () => {
    // This function will be passed to DashboardHeader but is handled at the AdminDashboard level
    // The actual implementation to show the dialog is in AdminDashboard
  };

  return (
    <div className="space-y-6 p-3">
      <DashboardHeader 
        highPriorityJobs={highPriorityJobs}
        onAlertClick={handleAlertClick}
        onNewTaskClick={handleNewTaskClick}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <JobsList />
        </div>
        <div>
          <DashboardActions />
        </div>
      </div>
    </div>
  );
};

export default OverviewTabContent;
