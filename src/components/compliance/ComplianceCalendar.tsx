
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCompliance } from "@/context/ComplianceContext";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import ComplianceDashboard from "./ComplianceDashboard";
import TaskSummary from "./TaskSummary";

const ComplianceCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list" | "dashboard">("dashboard");
  const [showAddTask, setShowAddTask] = useState(false);
  
  const { getTasksByMonth } = useCompliance();
  
  // Get tasks for the selected month to highlight dates
  const selectedMonth = date ? date.getMonth() : new Date().getMonth();
  const selectedYear = date ? date.getFullYear() : new Date().getFullYear();
  const tasksInMonth = getTasksByMonth(selectedYear, selectedMonth);
  
  // Create an array of dates that have tasks for calendar highlighting
  const taskDates = tasksInMonth.map(task => {
    const taskDate = new Date(task.dueDate);
    return {
      date: taskDate,
      task: task
    };
  });

  // Function to render the calendar day with task indicators
  const renderDay = (day: Date) => {
    const matchingTasks = taskDates.filter(
      taskDate => 
        taskDate.date.getDate() === day.getDate() &&
        taskDate.date.getMonth() === day.getMonth() &&
        taskDate.date.getFullYear() === day.getFullYear()
    );
    
    if (matchingTasks.length > 0) {
      const highestAlertTask = matchingTasks.reduce((highest, current) => {
        const alertPriority: { [key in AlertLevel]: number } = {
          red: 3,
          amber: 2,
          green: 1,
          none: 0
        };
        return alertPriority[current.task.alertLevel] > alertPriority[highest.task.alertLevel] 
          ? current 
          : highest;
      }, matchingTasks[0]);
      
      let alertColor = "";
      switch (highestAlertTask.task.alertLevel) {
        case "red":
          alertColor = "bg-red-500";
          break;
        case "amber":
          alertColor = "bg-amber-500";
          break;
        case "green":
          alertColor = "bg-green-500";
          break;
        default:
          alertColor = "bg-blue-500";
      }
      
      return (
        <div className="relative">
          <span>{day.getDate()}</span>
          <div className={`absolute bottom-0 left-0 right-0 h-1 ${alertColor}`}></div>
          {matchingTasks.length > 1 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
              {matchingTasks.length}
            </Badge>
          )}
        </div>
      );
    }
    
    return day.getDate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Board</h1>
          <p className="text-muted-foreground">Compliance and recurring task manager</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={view} onValueChange={(v) => setView(v as any)}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="list">Task List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-4">
          <ComplianceDashboard onAddTask={() => setShowAddTask(true)} />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Compliance Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar 
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  components={{
                    DayContent: ({ date }) => renderDay(date)
                  }}
                />
              </CardContent>
            </Card>
            
            <div>
              <TaskSummary date={date} onAddTask={() => setShowAddTask(true)} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <TaskList onAddTask={() => setShowAddTask(true)} />
        </TabsContent>
      </Tabs>

      <TaskForm open={showAddTask} onOpenChange={setShowAddTask} />
    </div>
  );
};

export default ComplianceCalendar;
