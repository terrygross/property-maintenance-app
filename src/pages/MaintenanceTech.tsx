
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, ClipboardList, PhoneCall, CheckSquare, MessageCircle } from "lucide-react";
import TechHeader from "@/components/maintenance/tech/TechHeader";
import TechLeaveTab from "@/components/maintenance/tech/TechLeaveTab";
import TechJobsTab from "@/components/maintenance/tech/jobs/TechJobsTab";
import TechCallOutTab from "@/components/maintenance/tech/TechCallOutTab";
import TechComplianceLists from "@/components/maintenance/tech/TechComplianceLists";
import LoadingState from "@/components/maintenance/tech/LoadingState";
import TechDashboardHeader from "@/components/maintenance/tech/TechDashboardHeader";
import { useHighPriorityJobs } from "@/hooks/useHighPriorityJobs";
import { useAssignedJobs } from "@/hooks/useAssignedJobs";
import ChatInterface from "@/components/chat/ChatInterface";

const MaintenanceTech = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(true);

  // Both string "1" and the special ID for Tristan from the compliance list
  // Using both IDs to ensure we catch all assigned compliance lists for Tristan
  const currentUserId = "1";

  // Use the high priority jobs hook
  const { highPriorityJobs } = useHighPriorityJobs(currentUserId);

  // Use the assigned jobs hook
  const { 
    assignedJobs, 
    handleJobPhotoUpdate, 
    handleAcceptJob, 
    handleUpdateJobStatus,
    handleAddComment 
  } = useAssignedJobs(currentUserId);

  // Example leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "approved", reason: "Family vacation" },
    { id: "2", userId: "1", startDate: new Date(2024, 1, 15), endDate: new Date(2024, 1, 18), status: "pending", reason: "Personal time" },
  ]);

  useEffect(() => {
    // For demo purposes, we'll simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Handle clicking on the alert
  const handleAlertClick = () => {
    // Navigate to the jobs tab
    setActiveTab("jobs");
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TechHeader userId={currentUserId} />

      <div className="container mx-auto p-4 md:p-6">
        <TechDashboardHeader 
          highPriorityJobsCount={highPriorityJobs.length} 
          onAlertClick={handleAlertClick}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">
              <ClipboardList className="h-4 w-4 mr-2" />
              My Jobs
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarClock className="h-4 w-4 mr-2" />
              Leave Calendar
            </TabsTrigger>
            <TabsTrigger value="callout">
              <PhoneCall className="h-4 w-4 mr-2" />
              Call-Out Schedule
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <CheckSquare className="h-4 w-4 mr-2" />
              Compliance Lists
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageCircle className="h-4 w-4 mr-2" />
              Team Chat
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
            <TechComplianceLists userId={currentUserId} />
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <div className="h-[calc(100vh-250px)]">
              <ChatInterface currentUserId={currentUserId} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaintenanceTech;
