
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hasAdminAccess, UserRole } from "@/types/user";
import JobCardsTabContent from "./tabs/JobCardsTabContent";
import CallOutTabContent from "./tabs/CallOutTabContent";
import LeaveTabContent from "./tabs/LeaveTabContent";

interface MaintenanceJobCardsProps {
  userRole?: UserRole;
}

const MaintenanceJobCards = ({ userRole = "admin" }: MaintenanceJobCardsProps) => {
  const [activeTab, setActiveTab] = useState("jobcards");
  const isAdmin = hasAdminAccess(userRole);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="jobcards">Job Cards</TabsTrigger>
          <TabsTrigger value="callout">Call Out Schedule</TabsTrigger>
          <TabsTrigger value="leave">Leave Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="jobcards">
          <JobCardsTabContent userRole={userRole} />
        </TabsContent>

        <TabsContent value="callout">
          <CallOutTabContent userRole={userRole} />
        </TabsContent>

        <TabsContent value="leave">
          <LeaveTabContent userRole={userRole} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceJobCards;
