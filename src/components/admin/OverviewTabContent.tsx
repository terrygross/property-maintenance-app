
import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { useAppState } from "@/context/AppStateContext";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import { adminTabs } from "./AdminTabsList";
import DashboardHeader from "./dashboard/DashboardHeader";
import NewTaskDialog from "./tasks/NewTaskDialog";
import GridLayoutSelector from "./dashboard/GridLayoutSelector";
import DashboardCard from "./dashboard/DashboardCard";
import { 
  getTabCount, 
  getCardStyles, 
  getIconColor 
} from "./dashboard/dashboardUtils";
import { getGridClass } from "./dashboard/gridHelpers";

interface OverviewTabContentProps {
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

// Custom function to get card descriptions
const getCardDescription = (tabId: string): string => {
  switch (tabId) {
    case "users":
      return "Staff members";
    case "properties":
      return "Managed properties";
    case "maintenance":
      return "Maintenance settings";
    case "reporter":
      return "Pending assignments";
    case "reporter-management":
      return "Reporter stations";
    case "reports":
      return "Financial tracking and reports";
    case "jobs":
      return "Active maintenance jobs";
    case "tech-view":
      return "Technician interface";
    case "settings":
      return "System configuration";
    case "compliance":
      return "Compliance lists";
    case "maintenance-jobcards":
      return "Scheduled work";
    case "chat":
      return "Team communication";
    case "billing":
      return "Subscription & payments";
    case "logs":
      return "System activity logs";
    case "backup":
      return "Data backup & restore";
    case "recycle-bin":
      return "Deleted items";
    default:
      return "";
  }
};

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const { users, properties, reporterStations } = useAppState();
  const { jobCards: unassignedJobs } = useReporterJobs();
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [gridColumns, setGridColumns] = useState(4); // Default to 4 columns

  // Remove 'overview' from the tabs since we're already on that page
  const filteredTabs = adminTabs.filter(tab => tab.id !== "overview");

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

      <div className={`grid ${getGridClass(gridColumns)} gap-4`}>
        {filteredTabs.map((tab, index) => {
          // For reporter-management card, directly use the reporterStations from AppState
          const count = tab.id === "reporter-management" 
            ? reporterStations 
            : getTabCount(tab.id, users, properties, unassignedJobs);
            
          const description = getCardDescription(tab.id);
          const bgColorClass = getCardStyles(index);
          const iconColorClass = getIconColor(index);

          return (
            <DashboardCard
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              count={count}
              description={description}
              bgColorClass={bgColorClass}
              iconColorClass={iconColorClass}
              onClick={() => handleCardClick(tab.id)}
            />
          );
        })}
      </div>

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
