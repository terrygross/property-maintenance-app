
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminTabs } from "./AdminTabsList";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardCard from "./dashboard/DashboardCard";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import NewTaskDialog from "./tasks/NewTaskDialog";
import { useAppState } from "@/context/AppStateContext";
import GridLayoutSelector from "./dashboard/GridLayoutSelector";
import DashboardActions from "./dashboard/DashboardActions";
import { getCardStyles, getIconColor } from "./dashboard/dashboardUtils";
import { getGridClass } from "./dashboard/gridHelpers";
import { ComplianceProvider } from "@/context/ComplianceContext";
import ComplianceBoardCard from "../compliance/ComplianceBoardCard";

interface OverviewTabContentProps {
  setActiveTab: (tab: string) => void;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const navigate = useNavigate();
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const { users, properties } = useAppState();
  const [gridColumns, setGridColumns] = useState(4); // Default to 4 columns
  const gridClassName = getGridClass(gridColumns);

  const handleCardClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAlertClick = () => {
    setActiveTab("maintenance-jobcards");
  };

  const handleNewTaskClick = () => {
    setShowNewTaskDialog(true);
  };

  // Sample counts (replace with actual data in a real implementation)
  const reportedCount = 12;
  const propertiesCount = properties.length;
  const staffCount = users.filter(u => u.role === "maintenance_tech" || u.role === "contractor").length;
  const jobsCount = 28;
  const maintenanceSettingsCount = null;
  const techUiCount = null;
  const reportsCount = null;
  const chatCount = null;
  const complianceCount = 15;
  const billingCount = null;
  const settingsCount = null;
  const logsCount = null;
  const backupCount = null;
  const recycleCount = null;
  const reporterManagementCount = 3;

  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  return (
    <div className="space-y-6">
      <DashboardHeader 
        highPriorityJobs={highPriorityJobs}
        onAlertClick={handleAlertClick}
        onNewTaskClick={handleNewTaskClick}
      />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Quick Access</h2>
        <div>
          <GridLayoutSelector 
            gridColumns={gridColumns} 
            onGridChange={setGridColumns}
          />
        </div>
      </div>

      <div className={gridClassName}>
        {adminTabs.map((tab, index) => {
          if (tab.id === "overview") return null;

          let count = null;
          
          switch (tab.id) {
            case "users": count = staffCount; break;
            case "properties": count = propertiesCount; break;
            case "maintenance": count = maintenanceSettingsCount; break;
            case "compliance": count = complianceCount; break;
            case "maintenance-jobcards": count = jobsCount; break;
            case "tech-view": count = techUiCount; break;
            case "reporter": count = reportedCount; break;
            case "reporter-management": count = reporterManagementCount; break;
            case "jobs": count = jobsCount; break;
            case "reports": count = reportsCount; break;
            case "chat": count = chatCount; break;
            case "billing": count = billingCount; break;
            case "settings": count = settingsCount; break;
            case "logs": count = logsCount; break;
            case "backup": count = backupCount; break;
            case "recycle-bin": count = recycleCount; break;
            default: count = null;
          }

          let description;
          
          if (tab.id === "reporter-management") {
            description = `Base (2) + (${reporterManagementCount - 2}) Additional station`;
          } else if (tab.id === "maintenance-jobcards") {
            description = "View all job cards";
          } else if (tab.id === "reporter") {
            description = "Reported maintenance issues";
          } else if (tab.id === "users") {
            description = "Staff members";
          } else if (tab.id === "properties") {
            description = "Managed properties";
          }

          return (
            <DashboardCard 
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              count={count}
              description={description || "View & manage"}
              bgColorClass={getCardStyles(index)}
              iconColorClass={getIconColor(index)}
              onClick={() => handleCardClick(tab.id)}
            />
          );
        })}
        
        <ComplianceProvider>
          <ComplianceBoardCard />
        </ComplianceProvider>
      </div>

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
