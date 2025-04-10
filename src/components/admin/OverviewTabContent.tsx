
import React, { useEffect } from "react";
import { Grid } from "@/components/ui/grid";
import AdminCard from "./AdminCard";
import { adminTabs } from "./AdminTabsList";
import { ArchiveRestore, FileText } from "lucide-react";
import ComplianceBoardCard from "../compliance/ComplianceBoardCard";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { getCardDescription } from "./dashboard/dashboardUtils";
import DashboardCard from "./dashboard/DashboardCard";
import { JobCardProps } from "@/components/job/jobCardTypes";
import { getCardStyles, getIconColor, getTabCount, hasHighPriorityJobs } from "./dashboard/dashboardUtils";
import { useAppState } from "@/context/AppStateContext";

interface OverviewTabContentProps {
  setActiveTab?: (tab: string) => void;
  unassignedJobs?: JobCardProps[];
}

const OverviewTabContent = ({ setActiveTab, unassignedJobs = [] }: OverviewTabContentProps) => {
  const { users, properties } = useAppState();
  
  // Debug jobs data
  useEffect(() => {
    console.log("OverviewTabContent - Unassigned jobs:", unassignedJobs);
    console.log("OverviewTabContent - High priority unassigned jobs:", 
      unassignedJobs.filter(job => job.priority === "high" || job.highPriority === true));
    console.log("OverviewTabContent - Total unassigned jobs count:", unassignedJobs.length);
  }, [unassignedJobs]);
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to your property maintenance management system.</p>

      <Grid numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-4">
        {adminTabs
          .filter(tab => tab.id !== "overview" && tab.id !== "recycle-bin")
          .map((tab, index) => {
            // Check if this is the reporter tab and if there are high priority jobs
            const isReporterTab = tab.id === "reporter";
            const hasUnassignedJobs = unassignedJobs && Array.isArray(unassignedJobs) && unassignedJobs.length > 0;
            const hasHighPriorityUnassignedJobs = isReporterTab && hasHighPriorityJobs(unassignedJobs);
            
            // Log for debugging reporter card
            if (isReporterTab) {
              console.log("Reporter tab card - Has high priority jobs:", hasHighPriorityUnassignedJobs);
              console.log("Reporter tab card - Unassigned job count:", unassignedJobs?.length || 0);
              console.log("Reporter tab card - Is array:", Array.isArray(unassignedJobs));
            }
            
            // Force reporter tab count to reflect actual jobs array length
            let count = getTabCount(tab.id, users, properties, unassignedJobs);
            
            // Extra safety check for reporter tab
            if (isReporterTab && Array.isArray(unassignedJobs)) {
              count = unassignedJobs.length;
              console.log("Reporter tab card - Forced count to:", count);
            }
            
            return (
              <DashboardCard
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                count={count}
                description={getCardDescription(tab.id)}
                bgColorClass={getCardStyles(index, hasHighPriorityUnassignedJobs)}
                iconColorClass={getIconColor(index)}
                onClick={() => setActiveTab && setActiveTab(tab.id)}
                hasAlert={hasHighPriorityUnassignedJobs}
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
