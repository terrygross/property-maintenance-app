
import React from "react";
import { Grid } from "@/components/ui/grid";
import AdminCard from "./AdminCard";
import { adminTabs } from "./AdminTabsList";
import { ArchiveRestore, CalendarCheck } from "lucide-react";
import ComplianceBoardCard from "../compliance/ComplianceBoardCard";
import { ComplianceProvider } from "@/context/ComplianceContext";

interface OverviewTabContentProps {
  setActiveTab?: (tab: string) => void;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome to your property maintenance management system.</p>

      <Grid numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-4">
        {adminTabs
          .filter(tab => tab.id !== "overview" && tab.id !== "recycle-bin" && tab.id !== "logs")
          .map(tab => (
            <AdminCard
              key={tab.id}
              title={tab.label}
              icon={<tab.icon className="h-5 w-5" />}
              onClick={() => setActiveTab && setActiveTab(tab.id)}
            />
          ))}
          
        <AdminCard
          title="Backup & Restore"
          description="Backup and restore your data to cloud storage"
          icon={<ArchiveRestore className="h-5 w-5" />}
          onClick={() => setActiveTab && setActiveTab("backup")}
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
