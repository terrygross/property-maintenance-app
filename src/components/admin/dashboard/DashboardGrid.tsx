
import React from "react";
import { adminTabs } from "../AdminTabsList";
import DashboardCard from "./DashboardCard";
import { getGridClass } from "./gridHelpers";
import { 
  getTabCount, 
  getCardDescription, 
  getCardStyles, 
  getIconColor 
} from "./dashboardUtils";

interface DashboardGridProps {
  gridColumns: number;
  onCardClick: (tabName: string) => void;
  users: any[];
  properties: any[];
  unassignedJobs: any[];
  reporterStations: number;
}

const DashboardGrid = ({ 
  gridColumns, 
  onCardClick, 
  users, 
  properties, 
  unassignedJobs,
  reporterStations
}: DashboardGridProps) => {
  // Remove 'overview' from the tabs since we're already on that page
  const filteredTabs = adminTabs.filter(tab => tab.id !== "overview");
  
  return (
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
            onClick={() => onCardClick(tab.id)}
          />
        );
      })}
    </div>
  );
};

export default DashboardGrid;
