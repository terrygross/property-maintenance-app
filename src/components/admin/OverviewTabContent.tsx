
import React from "react";
import { Grid } from "@/components/ui/grid";
import AdminCard from "./AdminCard";
import { adminTabs } from "./AdminTabsList";
import { ArchiveRestore, FileText } from "lucide-react";
import ComplianceBoardCard from "../compliance/ComplianceBoardCard";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { getCardDescription } from "./dashboard/dashboardUtils";
import DashboardCard from "./dashboard/DashboardCard";
import { JobCardProps } from "@/components/job/jobCardTypes";
import { getCardStyles, getIconColor, getTabCount } from "./dashboard/dashboardUtils";
import { useAppState } from "@/context/AppStateContext";

interface OverviewTabContentProps {
  setActiveTab?: (tab: string) => void;
  unassignedJobs?: JobCardProps[];
}

const OverviewTabContent = ({ setActiveTab, unassignedJobs = [] }: OverviewTabContentProps) => {
  const { users, properties } = useAppState();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to your property maintenance management system.</p>

      <Grid numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-4">
        {adminTabs
          .filter(tab => tab.id !== "overview" && tab.id !== "recycle-bin")
          .map((tab, index) => {
            const hasReportedJobs = tab.id === "reporter" && unassignedJobs.length > 0;
            const count = getTabCount(tab.id, users, properties, unassignedJobs);
            
            return (
              <DashboardCard
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                count={count}
                description={getCardDescription(tab.id)}
                bgColorClass={getCardStyles(index, hasReportedJobs)}
                iconColorClass={getIconColor(index)}
                onClick={() => setActiveTab && setActiveTab(tab.id)}
                hasAlert={hasReportedJobs}
              />
            );
          })}
          
        <AdminCard
          title="Backup & Restore"
          description="Backup and restore your data to cloud storage"
          icon={<ArchiveRestore className="h-5 w-5" />}
          onClick={() => setActiveTab && setActiveTab("backup")}
        />
        
        <AdminCard
          title="System Logs"
          description="View system activity logs and events"
          icon={<FileText className="h-5 w-5" />}
          onClick={() => setActiveTab && setActiveTab("logs")}
        />
        
        {/* Wrap ComplianceBoardCard with ComplianceProvider */}
        <ComplianceProvider>
          <ComplianceBoardCard />
        </ComplianceProvider>
      </Grid>
    </div>
  );
};

export default OverviewTabContent;
