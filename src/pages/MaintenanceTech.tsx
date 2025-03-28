
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CalendarClock, ClipboardList, PhoneCall } from "lucide-react";
import LeaveRequestForm from "@/components/maintenance/jobcards/leave/LeaveRequestForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CallOutSchedule from "@/components/maintenance/jobcards/CallOutSchedule";

const MaintenanceTech = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openRequest, setOpenRequest] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Example leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "approved", reason: "Family vacation" },
    { id: "2", userId: "1", startDate: new Date(2024, 1, 15), endDate: new Date(2024, 1, 18), status: "pending", reason: "Personal time" },
  ]);

  // Example assigned jobs
  const [assignedJobs, setAssignedJobs] = useState([
    { id: "j1", title: "Fix heating system", location: "Building A", priority: "high", dueDate: new Date(2023, 11, 30) },
    { id: "j2", title: "Replace light fixtures", location: "Building C", priority: "medium", dueDate: new Date(2023, 12, 5) },
    { id: "j3", title: "Inspect water damage", location: "Building B", priority: "low", dueDate: new Date(2023, 12, 10) },
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Maintenance Dashboard</h1>
              <p className="text-muted-foreground">Welcome, John Doe</p>
            </div>
            <Button variant="outline" onClick={() => console.log("logout")}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

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
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Leave Schedule</h2>
              <Button onClick={() => setOpenRequest(true)}>Request Leave</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-3"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {leaveRequests.length === 0 ? (
                    <div className="text-center p-6">
                      <p className="text-muted-foreground">No leave requests found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leaveRequests.map((leave) => (
                        <div key={leave.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">
                                {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                              </p>
                              <p className="text-sm text-muted-foreground">{leave.reason}</p>
                            </div>
                            <Badge
                              className={`${
                                leave.status === "approved"
                                  ? "bg-green-500"
                                  : leave.status === "denied"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                              }`}
                            >
                              {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <LeaveRequestForm
              openRequest={openRequest}
              setOpenRequest={setOpenRequest}
            />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                {assignedJobs.length === 0 ? (
                  <div className="text-center p-6">
                    <p className="text-muted-foreground">No jobs currently assigned</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {assignedJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{job.title}</h3>
                              <Badge className={getPriorityColor(job.priority)}>
                                {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{job.location}</p>
                            <p className="text-xs mt-2">
                              Due: {job.dueDate.toLocaleDateString()}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="callout" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Call-Out Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <CallOutSchedule isReadOnly={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaintenanceTech;
