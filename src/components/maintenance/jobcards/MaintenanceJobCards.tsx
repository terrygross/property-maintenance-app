
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hasAdminAccess, UserRole } from "@/types/user";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import JobCardsTabContent from "./tabs/JobCardsTabContent";
import LeaveTabContent from "./tabs/LeaveTabContent";
import CallOutTabContent from "./tabs/CallOutTabContent";

interface MaintenanceJobCardsProps {
  userRole?: UserRole;
}

const MaintenanceJobCards = ({ userRole = "admin" }: MaintenanceJobCardsProps) => {
  const [activeTab, setActiveTab] = useState("leave");
  const { leaveRequests, handleLeaveAction } = useLeaveRequests();
  const isAdmin = hasAdminAccess(userRole);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="leave" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="jobcards">Job Cards</TabsTrigger>
          <TabsTrigger value="leave">Leave Calendar</TabsTrigger>
          <TabsTrigger value="callout">Call-Out Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobcards">
          <JobCardsTabContent userRole={userRole} />
        </TabsContent>
        
        <TabsContent value="leave">
          <LeaveTabContent 
            leaveRequests={leaveRequests} 
            onLeaveAction={handleLeaveAction} 
            isAdmin={isAdmin} 
          />
        </TabsContent>
        
        <TabsContent value="callout">
          <CallOutTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceJobCards;
