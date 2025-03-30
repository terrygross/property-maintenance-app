import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, ClipboardList, PhoneCall, CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TechHeader from "@/components/maintenance/tech/TechHeader";
import TechLeaveTab from "@/components/maintenance/tech/TechLeaveTab";
import TechJobsTab from "@/components/maintenance/tech/TechJobsTab";
import TechCallOutTab from "@/components/maintenance/tech/TechCallOutTab";
import TechComplianceLists from "@/components/maintenance/tech/TechComplianceLists";
import ChatDrawer from "@/components/chat/ChatDrawer";
import HighPriorityAlert from "@/components/alerts/HighPriorityAlert";

const MaintenanceTech = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(true);
  const [highPriorityJobs, setHighPriorityJobs] = useState<any[]>([]);
  const { toast } = useToast();

  // Both string "1" and the special ID for Tristan from the compliance list
  // Using both IDs to ensure we catch all assigned compliance lists for Tristan
  const currentUserId = "1";

  // Example leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "approved", reason: "Family vacation" },
    { id: "2", userId: "1", startDate: new Date(2024, 1, 15), endDate: new Date(2024, 1, 18), status: "pending", reason: "Personal time" },
  ]);

  // Example assigned jobs with photo fields and a high priority job
  const [assignedJobs, setAssignedJobs] = useState([
    { 
      id: "j1", 
      title: "Fix heating system", 
      location: "Building A", 
      priority: "high", 
      dueDate: new Date(2023, 11, 30),
      photos: { before: "", after: "", reporter: "/images/broken-heater.jpg" }
    },
    { 
      id: "j2", 
      title: "Replace light fixtures", 
      location: "Building C", 
      priority: "medium", 
      dueDate: new Date(2023, 12, 5),
      photos: { before: "", after: "", reporter: "/images/broken-light.jpg" }
    },
    { 
      id: "j3", 
      title: "Inspect water damage", 
      location: "Building B", 
      priority: "low", 
      dueDate: new Date(2023, 12, 10),
      photos: { before: "", after: "", reporter: "/images/water-damage.jpg" }
    },
    { 
      id: "j4", 
      title: "URGENT: Electrical hazard", 
      location: "Main Building", 
      priority: "high", 
      dueDate: new Date(), // Today
      photos: { before: "", after: "", reporter: "/images/electrical-hazard.jpg" }
    }
  ]);

  useEffect(() => {
    // Load high priority jobs from localStorage
    const checkHighPriorityJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          // Filter to only show assigned high priority jobs for this technician
          const highPriorityAssigned = parsedJobs.filter((job: any) => 
            job.priority === "high" && 
            job.status === "assigned" && 
            job.assignedTo === currentUserId
          );
          
          setHighPriorityJobs(highPriorityAssigned);
          
          // Show toast for newly assigned high priority jobs
          highPriorityAssigned.forEach(job => {
            if (!job.alertShown) {
              toast({
                title: "High Priority Alert!",
                description: `URGENT: ${job.title} requires immediate attention!`,
                variant: "destructive",
                duration: 10000, // Show for 10 seconds
              });
              
              // Mark as shown in localStorage to prevent duplicate notifications
              const updatedJobs = parsedJobs.map((j: any) => 
                j.id === job.id ? { ...j, alertShown: true } : j
              );
              localStorage.setItem('reporterJobs', JSON.stringify(updatedJobs));
            }
          });
        }
      } catch (error) {
        console.error("Error checking high priority jobs:", error);
      }
    };
    
    // For demo purposes, we'll simulate loading data
    setTimeout(() => {
      setLoading(false);
      checkHighPriorityJobs();
    }, 800);
    
    // Set up periodic checks
    const interval = setInterval(checkHighPriorityJobs, 10000);
    
    return () => clearInterval(interval);
  }, [toast, currentUserId]);

  // Handle clicking on the alert
  const handleAlertClick = () => {
    // Navigate to the jobs tab
    setActiveTab("jobs");
  };

  // Function to handle photo updates for jobs
  const handleJobPhotoUpdate = (jobId: string, type: "before" | "after", imageUrl: string) => {
    setAssignedJobs(prev => 
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            photos: {
              ...job.photos,
              [type]: imageUrl
            }
          };
        }
        return job;
      })
    );
    
    toast({
      title: "Photo updated",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} photo has been saved.`,
    });
    
    // In a real application, this would sync with the backend
    console.log(`Updated ${type} photo for job ${jobId}`);
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <TechHeader userId={currentUserId} />

      <div className="container mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Technician Dashboard</h2>
          {highPriorityJobs.length > 0 && (
            <HighPriorityAlert 
              count={highPriorityJobs.length} 
              onClick={handleAlertClick}
            />
          )}
        </div>
        
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
          </TabsList>

          <TabsContent value="jobs" className="space-y-4">
            <TechJobsTab 
              assignedJobs={assignedJobs} 
              onPhotoCapture={handleJobPhotoUpdate}
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
        </Tabs>
      </div>

      {/* Add the chat drawer */}
      <ChatDrawer currentUserId={currentUserId} />
    </div>
  );
};

export default MaintenanceTech;
