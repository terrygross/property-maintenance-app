
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hasAdminAccess, UserRole } from "@/types/user";
import JobCardsTabContent from "./tabs/JobCardsTabContent";

interface MaintenanceJobCardsProps {
  userRole?: UserRole;
}

const MaintenanceJobCards = ({ userRole = "admin" }: MaintenanceJobCardsProps) => {
  const isAdmin = hasAdminAccess(userRole);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="jobcards" className="w-full">
        <JobCardsTabContent userRole={userRole} />
      </Tabs>
    </div>
  );
};

export default MaintenanceJobCards;
