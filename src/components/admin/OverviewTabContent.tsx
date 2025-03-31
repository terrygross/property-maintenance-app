
import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { useAppState } from "@/context/AppStateContext";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import DashboardHeader from "./dashboard/DashboardHeader";
import GridLayoutSelector from "./dashboard/GridLayoutSelector";
import DashboardGrid from "./dashboard/DashboardGrid";
import NewTaskDialog from "./tasks/NewTaskDialog";
import HeaderActions from "./dashboard/HeaderActions";

interface OverviewTabContentProps {
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const { users, properties, reporterStations } = useAppState();
  const { jobCards: unassignedJobs } = useReporterJobs();
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [gridColumns, setGridColumns] = useState(4); // Default to 4 columns

  // Get technicians for New Task dialog
  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  const handleCardClick = (tabName: string) => {
    if (setActiveTab) {
      setActiveTab(tabName);
    }
  };

  const handleAlertClick = () => {
    if (setActiveTab) {
      setActiveTab("reporter");
    }
  };

  const handleNewTaskClick = () => {
    setShowNewTaskDialog(true);
  };

  // Handle grid column change
  const handleGridChange = (cols: number) => {
    setGridColumns(cols);
  };

  return (
    <div className="space-y-6 p-3">
      <DashboardHeader 
        highPriorityJobs={highPriorityJobs}
        onAlertClick={handleAlertClick}
        onNewTaskClick={handleNewTaskClick}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <GridLayoutSelector 
          gridColumns={gridColumns} 
          onGridChange={handleGridChange} 
        />
      </div>

      <DashboardGrid 
        gridColumns={gridColumns}
        onCardClick={handleCardClick}
        users={users}
        properties={properties}
        unassignedJobs={unassignedJobs}
        reporterStations={reporterStations}
      />

      {/* Add the NewTaskDialog */}
      <NewTaskDialog
        open={showNewTaskDialog}
        onOpenChange={setShowNewTaskDialog}
        technicians={technicians}
        properties={properties}
      />
    </div>
  );
};

export default OverviewTabContent;
