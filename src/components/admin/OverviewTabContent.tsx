
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
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

interface OverviewTabContentProps {
  setActiveTab?: (tab: string) => void;
  unassignedJobs?: JobCardProps[];
}

const OverviewTabContent = ({ setActiveTab, unassignedJobs = [] }: OverviewTabContentProps) => {
  const { users, properties } = useAppState();
  
  // Debug jobs data and check directly from Supabase if needed
  useEffect(() => {
    console.log("OverviewTabContent - Unassigned jobs received:", unassignedJobs);
    console.log("OverviewTabContent - Unassigned jobs array:", Array.isArray(unassignedJobs));
    console.log("OverviewTabContent - Total unassigned jobs count:", unassignedJobs?.length || 0);
    
    // If we don't have unassigned jobs in props, check Supabase directly
    if ((!unassignedJobs || unassignedJobs.length === 0) && Array.isArray(unassignedJobs)) {
      const checkUnassignedJobsDirectly = async () => {
        try {
          const { data, error } = await reporterJobsTable()
            .select('*')
            .or('status.eq.unassigned,assigned_to.is.null')
            .neq('status', 'completed');
            
          if (error) throw error;
          
          if (data && data.length > 0) {
            console.log("OverviewTabContent - Direct Supabase check found unassigned jobs:", data.length);
            
            // Force a refresh of the job data
            document.dispatchEvent(new Event('jobsUpdated'));
          }
        } catch (err) {
          console.error("Error checking for unassigned jobs directly:", err);
        }
      };
      
      checkUnassignedJobsDirectly();
    }
    
    if (unassignedJobs && unassignedJobs.length > 0) {
      console.log("OverviewTabContent - First unassigned job:", unassignedJobs[0]);
      
      // Check for high priority jobs
      const highPriorityJobs = unassignedJobs.filter(job => 
        job.priority === "high" || job.highPriority === true
      );
      console.log("OverviewTabContent - High priority unassigned jobs:", highPriorityJobs);
    }
    
    // Check localStorage directly
    try {
      const savedJobs = localStorage.getItem('reporterJobs');
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        const unassignedDirectCount = parsedJobs.filter((job: any) => 
          (!job.assignedTo || job.status === "unassigned") && job.status !== "completed"
        ).length;
        console.log(`OverviewTabContent - Direct localStorage check: ${unassignedDirectCount} unassigned jobs`);
      }
    } catch (error) {
      console.error("OverviewTabContent - Error checking localStorage:", error);
    }
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
            
            // For reporter tab, check directly for high priority jobs
            let hasHighPriorityUnassignedJobs = false;
            
            if (isReporterTab) {
              // First check props
              if (hasUnassignedJobs) {
                hasHighPriorityUnassignedJobs = unassignedJobs.some(job => 
                  job.priority === "high" || job.highPriority === true
                );
              }
              
              // If no high priority found in props, check localStorage
              if (!hasHighPriorityUnassignedJobs) {
                try {
                  const savedJobs = localStorage.getItem('reporterJobs');
                  if (savedJobs) {
                    const parsedJobs = JSON.parse(savedJobs);
                    hasHighPriorityUnassignedJobs = parsedJobs.some((job: any) => 
                      (job.priority === "high" || job.highPriority === true) &&
                      (!job.assignedTo || job.status === "unassigned") && 
                      job.status !== "completed"
                    );
                  }
                } catch (error) {
                  console.error("Reporter tab card - Error checking localStorage:", error);
                }
              }
              
              console.log("Reporter tab card - Has high priority jobs:", hasHighPriorityUnassignedJobs);
            }
            
            // Get the count for this tab
            let count = getTabCount(tab.id, users, properties, unassignedJobs);
            
            // For reporter tab without count from getTabCount, check localStorage directly
            if (isReporterTab && (count === 0 || count === null)) {
              try {
                const savedJobs = localStorage.getItem('reporterJobs');
                if (savedJobs) {
                  const parsedJobs = JSON.parse(savedJobs);
                  const unassignedDirectCount = parsedJobs.filter((job: any) => 
                    (!job.assignedTo || job.status === "unassigned") && job.status !== "completed"
                  ).length;
                  if (unassignedDirectCount > 0) {
                    count = unassignedDirectCount;
                  }
                }
              } catch (error) {
                console.error("Reporter tab card - Error checking localStorage:", error);
              }
            }
            
            console.log(`Tab ${tab.id} count:`, count);
            
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
        
        <ComplianceProvider>
          <ComplianceBoardCard />
        </ComplianceProvider>
      </Grid>
    </div>
  );
};

export default OverviewTabContent;
