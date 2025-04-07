
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, ClipboardList, PhoneCall, CheckSquare, MessageCircle } from "lucide-react";
import { useAssignedJobs } from "@/hooks/jobs/useAssignedJobs";
import { useHighPriorityJobs } from "@/hooks/highPriorityJobs/useHighPriorityJobs";
import TechJobsTab from "./jobs/TechJobsTab";
import TechLeaveTab from "./TechLeaveTab";
import TechCallOutTab from "./TechCallOutTab";
import TechComplianceLists from "./TechComplianceLists";
import TechDashboardHeader from "./TechDashboardHeader";
import EnhancedChatInterface from "@/components/chat/EnhancedChatInterface";

interface TechnicianInterfaceSimulationProps {
  technicianId: string;
}

const TechnicianInterfaceSimulation: React.FC<TechnicianInterfaceSimulationProps> = ({ 
  technicianId 
}) => {
  const [activeTab, setActiveTab] = useState("jobs");

  // Use the high priority jobs hook
  const { highPriorityJobs } = useHighPriorityJobs(technicianId);

  // Use the assigned jobs hook
  const { 
    assignedJobs, 
    handleJobPhotoUpdate, 
    handleAcceptJob, 
    handleUpdateJobStatus,
    handleAddComment
  } = useAssignedJobs(technicianId);

  // Example leave requests for the technician
  const leaveRequests = [
    { id: "1", userId: technicianId, startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "approved", reason: "Family vacation" },
    { id: "2", userId: technicianId, startDate: new Date(2024, 1, 15), endDate: new Date(2024, 1, 18), status: "pending", reason: "Personal time" },
  ];

  // Handle clicking on the alert
  const handleAlertClick = () => {
    // Navigate to the jobs tab
    setActiveTab("jobs");
  };

  return (
    <Card className="border-2 border-dashed border-gray-200 p-2">
      <CardContent className="p-4">
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-center text-muted-foreground mb-4">
              This is a simulation of the technician interface as seen on a mobile device
            </p>
            
            <div className="max-w-md mx-auto bg-gray-50 rounded-lg overflow-hidden shadow border border-gray-200">
              {/* Mock device frame */}
              <div className="h-4 bg-gray-200 flex items-center justify-center rounded-t-lg">
                <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Dashboard header with alerts */}
                <TechDashboardHeader 
                  highPriorityJobsCount={highPriorityJobs.length} 
                  onAlertClick={handleAlertClick}
                />
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 w-full grid grid-cols-5 h-auto">
                    <TabsTrigger value="jobs" className="flex flex-col py-2 px-2 h-auto text-xs">
                      <ClipboardList className="h-4 w-4 mb-1" />
                      Jobs
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="flex flex-col py-2 px-2 h-auto text-xs">
                      <CalendarClock className="h-4 w-4 mb-1" />
                      Leave
                    </TabsTrigger>
                    <TabsTrigger value="callout" className="flex flex-col py-2 px-2 h-auto text-xs">
                      <PhoneCall className="h-4 w-4 mb-1" />
                      Call-Out
                    </TabsTrigger>
                    <TabsTrigger value="compliance" className="flex flex-col py-2 px-2 h-auto text-xs">
                      <CheckSquare className="h-4 w-4 mb-1" />
                      Compliance
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex flex-col py-2 px-2 h-auto text-xs">
                      <MessageCircle className="h-4 w-4 mb-1" />
                      Chat
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="jobs" className="space-y-4">
                    <TechJobsTab 
                      assignedJobs={assignedJobs} 
                      onPhotoCapture={handleJobPhotoUpdate}
                      onAcceptJob={handleAcceptJob}
                      onUpdateStatus={handleUpdateJobStatus}
                      onAddComment={handleAddComment}
                    />
                  </TabsContent>

                  <TabsContent value="calendar" className="space-y-4">
                    <TechLeaveTab leaveRequests={leaveRequests} />
                  </TabsContent>

                  <TabsContent value="callout" className="space-y-4">
                    <TechCallOutTab />
                  </TabsContent>
                  
                  <TabsContent value="compliance" className="space-y-4">
                    <TechComplianceLists userId={technicianId} />
                  </TabsContent>
                  
                  <TabsContent value="chat" className="space-y-4">
                    <div className="h-[250px]">
                      <EnhancedChatInterface currentUserId={technicianId} />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Mock device home button */}
              <div className="h-6 bg-gray-200 flex items-center justify-center rounded-b-lg">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicianInterfaceSimulation;
