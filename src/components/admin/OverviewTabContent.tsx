
import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import JobsList from "../jobs/JobsList";
import { Dispatch, SetStateAction } from "react";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  CheckSquare, 
  ClipboardList, 
  MessageCircle, 
  Settings, 
  Users,
  CheckCircle2,
  FileText,
  Building,
  Calendar,
  FileSpreadsheet,
  Wrench
} from "lucide-react";
import { useAppState } from "@/context/AppStateContext";
import { useReporterJobs } from "@/hooks/useReporterJobs";

interface OverviewTabContentProps {
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const { users, properties } = useAppState();
  const { jobCards: unassignedJobs } = useReporterJobs();
  const [isLoaded, setIsLoaded] = useState(false);

  // Count users by role
  const technicianCount = users.filter(user => 
    user.role === "maintenance_tech"
  ).length;

  // Count contractors
  const contractorCount = users.filter(user => user.role === "contractor").length;

  // Ensure component is properly loaded
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // If not loaded, re-render
  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const handleAlertClick = () => {
    if (setActiveTab) {
      setActiveTab("reporter");
    }
  };

  const handleNewTaskClick = () => {
    // This function will be passed to DashboardHeader but is handled at the AdminDashboard level
    console.log("New task button clicked");
  };

  const handleCardClick = (tabName: string) => {
    if (setActiveTab) {
      setActiveTab(tabName);
    }
  };

  if (!isLoaded) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-3">
      <DashboardHeader 
        highPriorityJobs={highPriorityJobs}
        onAlertClick={handleAlertClick}
        onNewTaskClick={handleNewTaskClick}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Dashboard cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card 
              className="bg-white hover:bg-blue-50 transition-colors cursor-pointer border-blue-100"
              onClick={() => handleCardClick("users")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Users</CardTitle>
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <CardDescription>Manage user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {technicianCount}
                </p>
                <p className="text-xs text-muted-foreground">Maintenance technicians</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-green-50 transition-colors cursor-pointer border-green-100"
              onClick={() => handleCardClick("properties")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Properties</CardTitle>
                  <CheckSquare className="h-5 w-5 text-green-500" />
                </div>
                <CardDescription>Manage properties</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {properties.length}
                </p>
                <p className="text-xs text-muted-foreground">Registered properties</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-purple-50 transition-colors cursor-pointer border-purple-100"
              onClick={() => handleCardClick("maintenance")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Contractors</CardTitle>
                  <Settings className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>External service providers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {contractorCount}
                </p>
                <p className="text-xs text-muted-foreground">Registered contractors</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-yellow-50 transition-colors cursor-pointer border-yellow-100"
              onClick={() => handleCardClick("reporter")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Reported Jobs</CardTitle>
                  <ClipboardList className="h-5 w-5 text-yellow-500" />
                </div>
                <CardDescription>View and assign jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {unassignedJobs.length}
                </p>
                <p className="text-xs text-muted-foreground">Unassigned jobs</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-red-50 transition-colors cursor-pointer border-red-100"
              onClick={() => handleCardClick("reports")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Reports</CardTitle>
                  <BarChart3 className="h-5 w-5 text-red-500" />
                </div>
                <CardDescription>View analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Report categories</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-teal-50 transition-colors cursor-pointer border-teal-100"
              onClick={() => handleCardClick("chat")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Team Chat</CardTitle>
                  <MessageCircle className="h-5 w-5 text-teal-500" />
                </div>
                <CardDescription>Communication center</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">New messages</p>
              </CardContent>
            </Card>

            {/* Tech UI card */}
            <Card 
              className="bg-white hover:bg-slate-50 transition-colors cursor-pointer border-slate-100"
              onClick={() => handleCardClick("tech-view")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Tech UI</CardTitle>
                  <Wrench className="h-5 w-5 text-slate-500" />
                </div>
                <CardDescription>Technician Interface</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{technicianCount}</p>
                <p className="text-xs text-muted-foreground">Technician views</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-indigo-50 transition-colors cursor-pointer border-indigo-100"
              onClick={() => handleCardClick("compliance")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Compliance</CardTitle>
                  <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                </div>
                <CardDescription>Compliance Lists</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Active lists</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-orange-50 transition-colors cursor-pointer border-orange-100"
              onClick={() => handleCardClick("billing")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Billing</CardTitle>
                  <FileText className="h-5 w-5 text-orange-500" />
                </div>
                <CardDescription>Subscription Plans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Active subscription</p>
              </CardContent>
            </Card>

            <Card 
              className="bg-white hover:bg-emerald-50 transition-colors cursor-pointer border-emerald-100"
              onClick={() => handleCardClick("reporter-management")}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Reporter</CardTitle>
                  <Building className="h-5 w-5 text-emerald-500" />
                </div>
                <CardDescription>Reporter Management</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Reporting stations</p>
              </CardContent>
            </Card>
          </div>

          <JobsList />
        </div>
        <div>
          {/* Move DashboardActions to ReporterJobCards component */}
        </div>
      </div>
    </div>
  );
};

export default OverviewTabContent;
