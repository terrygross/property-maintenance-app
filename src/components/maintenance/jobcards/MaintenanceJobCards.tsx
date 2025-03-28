
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import JobCardsList from "./JobCardsList";
import LeaveCalendar from "./LeaveCalendar";
import CallOutSchedule from "./CallOutSchedule";

const MaintenanceJobCards = () => {
  const [activeTab, setActiveTab] = useState("jobcards");

  return (
    <div className="space-y-4">
      <Tabs defaultValue="jobcards" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="jobcards">Job Cards</TabsTrigger>
          <TabsTrigger value="leave">Leave Calendar</TabsTrigger>
          <TabsTrigger value="callout">Call-Out Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobcards">
          <Card>
            <CardContent className="pt-6">
              <JobCardsList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leave">
          <Card>
            <CardContent className="pt-6">
              <LeaveCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="callout">
          <Card>
            <CardContent className="pt-6">
              <CallOutSchedule />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceJobCards;
