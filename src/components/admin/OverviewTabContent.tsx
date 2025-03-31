
import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import JobsList from "../jobs/JobsList";
import DashboardActions from "./dashboard/DashboardActions";

const OverviewTabContent = () => {
  return (
    <div className="space-y-6 p-3">
      <DashboardHeader />

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
