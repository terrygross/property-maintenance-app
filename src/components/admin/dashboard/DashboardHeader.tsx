
import React from "react";
import HeaderActions from "./HeaderActions";

interface DashboardHeaderProps {
  highPriorityJobs: any[];
  onAlertClick: () => void;
  onNewTaskClick: () => void;
}

const DashboardHeader = ({ highPriorityJobs, onAlertClick, onNewTaskClick }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your maintenance system</p>
      </div>
      <HeaderActions 
        highPriorityJobs={highPriorityJobs}
        onAlertClick={onAlertClick}
        onNewTaskClick={onNewTaskClick}
      />
    </div>
  );
};

export default DashboardHeader;
