
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, ClipboardList, AlertTriangle } from "lucide-react";
import { useCompliance } from "@/context/ComplianceContext";
import AlertSummary from "./AlertSummary";
import UpcomingTasks from "./UpcomingTasks";

interface ComplianceDashboardProps {
  onAddTask: () => void;
}

const ComplianceDashboard = ({ onAddTask }: ComplianceDashboardProps) => {
  const { tasks, getAlertCount } = useCompliance();
  const alertCounts = getAlertCount();
  
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const confirmedTasks = tasks.filter(task => task.status === "confirmed").length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Compliance Overview</h2>
        <Button onClick={onAddTask} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">All compliance tasks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">Requiring action</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedTasks}</div>
            <p className="text-xs text-muted-foreground">Scheduled for completion</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">Finished tasks</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingTasks />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertSummary />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
