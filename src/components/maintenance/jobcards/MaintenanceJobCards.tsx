
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import JobCardsList from "./JobCardsList";
import LeaveCalendar from "./LeaveCalendar";
import CallOutSchedule from "./CallOutSchedule";

const MaintenanceJobCards = () => {
  const [activeTab, setActiveTab] = useState("jobcards");
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "pending", reason: "Family vacation" },
    { id: "2", userId: "2", startDate: new Date(2023, 11, 27), endDate: new Date(2023, 11, 31), status: "pending", reason: "Personal time" },
    { id: "3", userId: "3", startDate: new Date(2024, 0, 3), endDate: new Date(2024, 0, 10), status: "pending", reason: "Medical leave" },
  ]);

  const handleLeaveAction = (leaveId: string, action: "approve" | "deny" | "reschedule", newDates?: { startDate: Date, endDate: Date }) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => {
        if (request.id === leaveId) {
          const updatedRequest = { 
            ...request, 
            status: action === "approve" ? "approved" : action === "deny" ? "denied" : "pending"
          };
          
          if (action === "reschedule" && newDates) {
            updatedRequest.startDate = newDates.startDate;
            updatedRequest.endDate = newDates.endDate;
          }
          
          return updatedRequest;
        }
        return request;
      })
    );
  };

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
              <LeaveCalendar 
                leaveRequests={leaveRequests} 
                onLeaveAction={handleLeaveAction} 
                isAdmin={true} 
              />
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
