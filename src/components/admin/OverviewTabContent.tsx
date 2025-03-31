
import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import JobsList from "../jobs/JobsList";
import DashboardActions from "./dashboard/DashboardActions";
import { Dispatch, SetStateAction } from "react";
import { useHighPriorityJobsMonitor } from "@/hooks/useHighPriorityJobsMonitor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckSquare, ClipboardList, MessageCircle, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OverviewTabContentProps {
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  const highPriorityJobs = useHighPriorityJobsMonitor();
  const navigate = useNavigate();

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
                  {/* You could add dynamic user count here */}
                  8
                </p>
                <p className="text-xs text-muted-foreground">Active accounts</p>
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
                  {/* You could add dynamic property count here */}
                  12
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
                  <CardTitle className="text-lg font-medium">Maintenance</CardTitle>
                  <Settings className="h-5 w-5 text-purple-500" />
                </div>
                <CardDescription>System settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {/* You could add something relevant here */}
                  5
                </p>
                <p className="text-xs text-muted-foreground">Configuration areas</p>
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
                  {highPriorityJobs.length}
                </p>
                <p className="text-xs text-muted-foreground">High priority items</p>
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
                <p className="text-2xl font-bold">
                  {/* You could add something relevant here */}
                  4
                </p>
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
                <p className="text-2xl font-bold">
                  {/* You could add dynamic message count here */}
                  12
                </p>
                <p className="text-xs text-muted-foreground">New messages</p>
              </CardContent>
            </Card>
          </div>

          <JobsList />
        </div>
        <div>
          <DashboardActions />
        </div>
      </div>
    </div>
  );
};

export default OverviewTabContent;
