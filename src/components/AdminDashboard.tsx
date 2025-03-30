
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AdminTab from "./AdminTab";
import UserManagement from "./UserManagement";
import PropertyManagement from "./PropertyManagement";
import MaintenanceConfig from "./maintenance/MaintenanceConfig";
import Reports from "./maintenance/Reports";
import ReporterJobCards from "./reporter/ReporterJobCards";
import JobsList from "./jobs/JobsList";
import AdminTabsList from "./admin/AdminTabsList";
import OverviewTabContent from "./admin/OverviewTabContent";
import GenericTabContent from "./admin/GenericTabContent";
import MaintenanceJobCards from "./maintenance/jobcards/MaintenanceJobCards";
import ChatInterface from "./chat/ChatInterface";
import ReporterManagement from "./reporter/ReporterManagement";
import BillingManagement from "./billing/BillingManagement";
import { UserRole } from "@/types/user";
import HighPriorityAlert from "./alerts/HighPriorityAlert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";

interface AdminDashboardProps {
  userRole?: UserRole;
}

const AdminDashboard = ({ userRole = "admin" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [highPriorityJobs, setHighPriorityJobs] = useState<any[]>([]);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const { toast } = useToast();
  const { users, properties } = useAppState();
  
  // For demo purposes, we'll use a hardcoded admin user ID
  const currentUserId = "4"; // Admin user ID

  // Filter users to get only technicians (including Nishad)
  const technicians = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  // Check for high priority jobs in localStorage
  useEffect(() => {
    const checkHighPriorityJobs = () => {
      try {
        const savedJobs = localStorage.getItem('reporterJobs');
        if (savedJobs) {
          const parsedJobs = JSON.parse(savedJobs);
          // Filter to only show unassigned high priority jobs
          const highPriorityUnassigned = parsedJobs.filter((job: any) => 
            job.priority === "high" && job.status === "unassigned"
          );
          
          setHighPriorityJobs(highPriorityUnassigned);
        }
      } catch (error) {
        console.error("Error checking high priority jobs:", error);
      }
    };
    
    // Check when component mounts
    checkHighPriorityJobs();
    
    // Set up periodic checks
    const interval = setInterval(checkHighPriorityJobs, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle clicking on the alert
  const handleAlertClick = () => {
    // Navigate to the reporter tab which shows unassigned jobs
    setActiveTab("reporter");
  };

  // Handle creating a new task
  const handleCreateTask = () => {
    if (!jobTitle || !jobLocation || selectedTechs.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select at least one technician.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get existing jobs from localStorage or initialize an empty array
      const savedJobs = localStorage.getItem('reporterJobs');
      const jobs = savedJobs ? JSON.parse(savedJobs) : [];
      
      // Create a new job for each selected technician
      selectedTechs.forEach(techId => {
        const newJob = {
          id: `job-${Date.now()}-${techId}`,
          title: jobTitle,
          property: jobLocation,
          description: jobDescription,
          priority: priority,
          status: "assigned",
          assignedTo: techId,
          reportDate: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          emailSent: true
        };
        
        // Add the new job to the array
        jobs.push(newJob);
      });
      
      // Save all jobs back to localStorage
      localStorage.setItem('reporterJobs', JSON.stringify(jobs));
      
      // Notify the user
      toast({
        title: "Task created",
        description: `The new task has been assigned to ${selectedTechs.length} technician(s).`,
      });
      
      // Reset form and close dialog
      setJobTitle("");
      setJobLocation("");
      setJobDescription("");
      setPriority("medium");
      setSelectedTechs([]);
      setShowNewTaskDialog(false);
      
      // Dispatch a custom event to notify other components about job updates
      const event = new Event('jobsUpdated');
      document.dispatchEvent(event);
      
      // Also dispatch storage event for backward compatibility
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Failed to create task",
        description: "There was an error creating the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle technician selection
  const handleTechnicianSelection = (techId: string) => {
    setSelectedTechs(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your maintenance system</p>
          </div>
          {highPriorityJobs.length > 0 && (
            <HighPriorityAlert 
              count={highPriorityJobs.length} 
              onClick={handleAlertClick}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowNewTaskDialog(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Task</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <AdminTabsList />

        <TabsContent value="overview" className="space-y-4">
          <OverviewTabContent setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="users">
          <AdminTab title="User Management" description="Add, edit, and manage system users and their permissions">
            <UserManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="properties">
          <AdminTab title="Property Management" description="Manage your property database">
            <PropertyManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="maintenance">
          <AdminTab title="Maintenance Settings" description="Configure maintenance system parameters">
            <MaintenanceConfig />
          </AdminTab>
        </TabsContent>

        <TabsContent value="reports">
          <AdminTab title="Reports" description="Access detailed maintenance performance reports">
            <Reports />
          </AdminTab>
        </TabsContent>

        <TabsContent value="maintenance-jobcards">
          <AdminTab title="Maintenance Job Cards" description="View job cards, manage leave calendar, and schedule call-out rota">
            <MaintenanceJobCards userRole={userRole} />
          </AdminTab>
        </TabsContent>

        <TabsContent value="chat">
          <AdminTab title="Team Chat" description="Communicate with all staff members in real-time">
            <div className="h-[600px]">
              <ChatInterface currentUserId={currentUserId} />
            </div>
          </AdminTab>
        </TabsContent>

        <TabsContent value="billing">
          <AdminTab title="Billing Management" description="Manage subscription plans, payments, and additional capacity">
            <BillingManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="settings">
          <GenericTabContent 
            title="System Settings" 
            description="Configure global parameters for your maintenance system" 
          />
        </TabsContent>

        <TabsContent value="logs">
          <GenericTabContent 
            title="System Logs" 
            description="View system events, errors, and user actions" 
          />
        </TabsContent>

        <TabsContent value="reporter">
          <AdminTab title="Reported Jobs" description="View and assign reported maintenance issues">
            <ReporterJobCards />
          </AdminTab>
        </TabsContent>
        
        <TabsContent value="reporter-management">
          <AdminTab title="Reporter Management" description="Manage reporter accounts and access based on your subscription">
            <ReporterManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="jobs">
          <AdminTab title="Jobs" description="Manage assigned maintenance jobs">
            <JobsList />
          </AdminTab>
        </TabsContent>

        <TabsContent value="backup">
          <GenericTabContent 
            title="Backup & Restore" 
            description="Backup and restore data from cloud storage" 
          />
        </TabsContent>
      </Tabs>
      
      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Maintenance Task</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                placeholder="Task title"
                className="col-span-3"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Select value={jobLocation} onValueChange={setJobLocation}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.name}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                placeholder="Task description"
                className="col-span-3"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Assign To</Label>
              <div className="col-span-3 border rounded-md p-3 space-y-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Select one or more technicians to assign this task to:
                </p>
                {technicians.map((tech) => (
                  <div key={tech.id} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={`tech-${tech.id}`} 
                      checked={selectedTechs.includes(tech.id)}
                      onChange={() => handleTechnicianSelection(tech.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor={`tech-${tech.id}`} className="text-sm">
                      {tech.first_name} {tech.last_name} 
                      {tech.role === "contractor" ? " (Contractor)" : " (In-house)"}
                    </label>
                  </div>
                ))}
                {technicians.length === 0 && (
                  <p className="text-sm text-muted-foreground">No technicians available</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTaskDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
