
import React from "react";
import HighPriorityAlert from "@/components/alerts/HighPriorityAlert";

interface TechDashboardHeaderProps {
  highPriorityJobsCount: number;
  onAlertClick: () => void;
}

const TechDashboardHeader = ({ highPriorityJobsCount, onAlertClick }: TechDashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Technician Dashboard</h2>
      {highPriorityJobsCount > 0 && (
        <HighPriorityAlert 
          count={highPriorityJobsCount} 
          onClick={onAlertClick}
        />
      )}
    </div>
  );
};

export default TechDashboardHeader;
