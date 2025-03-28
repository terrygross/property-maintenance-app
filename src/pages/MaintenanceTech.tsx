
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, ClipboardList, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TechHeader from "@/components/maintenance/tech/TechHeader";
import TechLeaveTab from "@/components/maintenance/tech/TechLeaveTab";
import TechJobsTab from "@/components/maintenance/tech/TechJobsTab";
import TechCallOutTab from "@/components/maintenance/tech/TechCallOutTab";
import ChatDrawer from "@/components/chat/ChatDrawer";

const MaintenanceTech = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Example leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "approved", reason: "Family vacation" },
    { id: "2", userId: "1", startDate: new Date(2024, 1, 15), endDate: new Date(2024, 1, 18), status: "pending", reason: "Personal time" },
  ]);

  // Example assigned jobs with photo fields
  const [assignedJobs, setAssignedJobs] = useState([
    { 
      id: "j1", 
      title: "Fix heating system", 
      location: "Building A", 
      priority: "high", 
      dueDate: new Date(2023, 11, 30),
      photos: { before: "", after: "" }
    },
    { 
      id: "j2", 
      title: "Replace light fixtures", 
      location: "Building C", 
      priority: "medium", 
      dueDate: new Date(2023, 12, 5),
      photos: { before: "", after: "" }
    },
    { 
      id: "j3", 
      title: "Inspect water damage", 
      location: "Building B", 
      priority: "low", 
      dueDate: new Date(2023, 12, 10),
      photos: { before: "", after: "" }
    },
  ]);

  // Example call-out schedule
  const [callOutDates, setCallOutDates] = useState([
    new Date(2023, 11, 15),
    new Date(2023, 11, 28),
    new Date(2024, 0, 10),
  ]);

  useEffect(() => {
    // For demo purposes, we'll simulate loading data
    // In a real implementation, we would fetch data from the backend
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse p-8 rounded-lg bg-white shadow">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // For demo purposes, we'll use a hardcoded current user ID
  const currentUserId = "1";

  return (
    <div className="min-h-screen bg-gray-50">
      <TechHeader />

      <div className="container mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">
              <CalendarClock className="h-4 w-4 mr-2" />
              Leave Calendar
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <ClipboardList className="h-4 w-4 mr-2" />
              My Jobs
            </TabsTrigger>
            <TabsTrigger value="callout">
              <PhoneCall className="h-4 w-4 mr-2" />
              Call-Out Schedule
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <TechLeaveTab leaveRequests={leaveRequests} />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <TechJobsTab assignedJobs={assignedJobs} />
          </TabsContent>

          <TabsContent value="callout" className="space-y-4">
            <TechCallOutTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add the chat drawer */}
      <ChatDrawer currentUserId={currentUserId} />
    </div>
  );
};

export default MaintenanceTech;
