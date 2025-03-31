
import React from "react";
import { Dispatch, SetStateAction } from "react";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";
import { useReporterJobs } from "@/hooks/useReporterJobs";
import { adminTabs } from "./AdminTabsList";
import DashboardHeader from "./dashboard/DashboardHeader";
import { useState } from "react";
import NewTaskDialog from "./tasks/NewTaskDialog";

interface OverviewTabContentProps {
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const { users, properties } = useAppState();
  const { jobCards: unassignedJobs } = useReporterJobs();
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);

  // Count users by role
  const technicianCount = users.filter(user => 
    user.role === "maintenance_tech"
  ).length;

  // Count contractors
  const contractorCount = users.filter(user => user.role === "contractor").length;

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

  // Get counts for various sections
  const getTabCount = (tabId: string) => {
    switch (tabId) {
      case "users": return technicianCount;
      case "properties": return properties.length;
      case "maintenance": return contractorCount;
      case "reporter": return unassignedJobs.length;
      case "tech-view": return technicianCount;
      case "reports": return 4;
      case "chat": return 12;
      case "compliance": return 3;
      case "billing": return 1;
      case "reporter-management": return 2;
      case "maintenance-jobcards": return 8;
      default: return null;
    }
  };

  // Get descriptions for various cards
  const getCardDescription = (tabId: string) => {
    switch (tabId) {
      case "users": return "Maintenance technicians";
      case "properties": return "Registered properties";
      case "maintenance": return "Registered contractors";
      case "reporter": return "Unassigned jobs";
      case "tech-view": return "Technician views";
      case "reports": return "Report categories";
      case "chat": return "New messages";
      case "compliance": return "Active lists";
      case "billing": return "Active subscription";
      case "reporter-management": return "Reporting stations";
      case "jobs": return "Active jobs";
      case "maintenance-jobcards": return "Assigned job cards";
      case "settings": return "System configurations";
      case "logs": return "System events";
      case "backup": return "Backup operations";
      case "recycle-bin": return "Deleted items";
      default: return "";
    }
  };

  // Get background colors for cards
  const getCardStyles = (index: number) => {
    const colorClasses = [
      "bg-white hover:bg-blue-50 border-blue-100",
      "bg-white hover:bg-green-50 border-green-100",
      "bg-white hover:bg-purple-50 border-purple-100",
      "bg-white hover:bg-yellow-50 border-yellow-100",
      "bg-white hover:bg-red-50 border-red-100",
      "bg-white hover:bg-teal-50 border-teal-100",
      "bg-white hover:bg-slate-50 border-slate-100",
      "bg-white hover:bg-indigo-50 border-indigo-100",
      "bg-white hover:bg-orange-50 border-orange-100",
      "bg-white hover:bg-emerald-50 border-emerald-100",
      "bg-white hover:bg-pink-50 border-pink-100",
      "bg-white hover:bg-cyan-50 border-cyan-100",
      "bg-white hover:bg-amber-50 border-amber-100",
      "bg-white hover:bg-lime-50 border-lime-100",
      "bg-white hover:bg-violet-50 border-violet-100",
      "bg-white hover:bg-fuchsia-50 border-fuchsia-100",
      "bg-white hover:bg-rose-50 border-rose-100"
    ];
    return colorClasses[index % colorClasses.length];
  };

  // Get text colors for icons
  const getIconColor = (index: number) => {
    const colorClasses = [
      "text-blue-500",
      "text-green-500",
      "text-purple-500",
      "text-yellow-500",
      "text-red-500",
      "text-teal-500",
      "text-slate-500",
      "text-indigo-500",
      "text-orange-500",
      "text-emerald-500",
      "text-pink-500",
      "text-cyan-500",
      "text-amber-500",
      "text-lime-500",
      "text-violet-500",
      "text-fuchsia-500",
      "text-rose-500"
    ];
    return colorClasses[index % colorClasses.length];
  };

  // Remove 'overview' from the tabs since we're already on that page
  const filteredTabs = adminTabs.filter(tab => tab.id !== "overview");

  // Get technicians for New Task dialog
  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  return (
    <div className="space-y-6 p-3">
      <DashboardHeader 
        highPriorityJobs={highPriorityJobs}
        onAlertClick={handleAlertClick}
        onNewTaskClick={handleNewTaskClick}
      />

      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTabs.map((tab, index) => {
          const count = getTabCount(tab.id);
          const description = getCardDescription(tab.id);
          const bgColorClass = getCardStyles(index);
          const iconColorClass = getIconColor(index);

          return (
            <Card 
              key={tab.id}
              className={`${bgColorClass} transition-colors cursor-pointer`}
              onClick={() => handleCardClick(tab.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">{tab.label}</CardTitle>
                  <tab.icon className={`h-5 w-5 ${iconColorClass}`} />
                </div>
              </CardHeader>
              <CardContent>
                {count !== null && (
                  <>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </>
                )}
                {count === null && (
                  <p className="text-sm text-muted-foreground">{description || "View & manage"}</p>
                )}
              </CardContent>
            </Card>
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
