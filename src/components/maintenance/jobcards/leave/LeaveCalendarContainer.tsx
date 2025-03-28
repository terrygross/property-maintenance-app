
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveRequestsList from "./LeaveRequestsList";
import LeaveRequestForm from "./LeaveRequestForm";
import RescheduleDialog from "./RescheduleDialog";
import LeaveReport from "./LeaveReport";

interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason?: string;
}

interface LeaveCalendarProps {
  leaveRequests?: LeaveRequest[];
  onLeaveAction?: (leaveId: string, action: "approve" | "deny" | "reschedule", newDates?: { startDate: Date, endDate: Date }) => void;
  isAdmin?: boolean;
}

const LeaveCalendarContainer = ({ 
  leaveRequests = [], 
  onLeaveAction, 
  isAdmin = false 
}: LeaveCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [calendarView, setCalendarView] = useState<"month" | "year">("month");
  const [openRequest, setOpenRequest] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [newStartDate, setNewStartDate] = useState<Date | undefined>(undefined);
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const handleApprove = (leaveId: string) => {
    onLeaveAction?.(leaveId, "approve");
    toast({
      title: "Leave approved",
      description: "The leave request has been approved.",
    });
  };

  const handleDeny = (leaveId: string) => {
    onLeaveAction?.(leaveId, "deny");
    toast({
      title: "Leave denied",
      description: "The leave request has been denied.",
    });
  };

  const openRescheduleDialog = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setNewStartDate(leave.startDate);
    setNewEndDate(leave.endDate);
    setOpenReschedule(true);
  };

  const handleReschedule = () => {
    if (selectedLeave && newStartDate && newEndDate) {
      onLeaveAction?.(selectedLeave.id, "reschedule", { startDate: newStartDate, endDate: newEndDate });
      toast({
        title: "Leave rescheduled",
        description: "The leave request has been rescheduled.",
      });
      setOpenReschedule(false);
    }
  };

  // Create an array of months for the year view
  const getYearMonths = () => {
    const currentYear = date ? date.getFullYear() : new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => new Date(currentYear, i, 1));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Leave Calendar</h3>
        <div className="flex gap-2">
          <Tabs value={calendarView} onValueChange={(value) => setCalendarView(value as "month" | "year")}>
            <TabsList className="grid w-36 grid-cols-2">
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          {isAdmin && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setOpenReport(true)}
            >
              <FileBarChart size={16} />
              Leave Report
            </Button>
          )}
          <LeaveRequestForm 
            openRequest={openRequest} 
            setOpenRequest={setOpenRequest} 
          />
        </div>
      </div>

      <div className={`flex ${calendarView === "year" ? "flex-col" : "flex-col lg:flex-row"} gap-4`}>
        {calendarView === "month" ? (
          <>
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-3"
              />
            </div>
            <div className="flex-1">
              <LeaveRequestsList 
                leaveRequests={leaveRequests}
                isAdmin={isAdmin}
                onApprove={handleApprove}
                onDeny={handleDeny}
                onReschedule={openRescheduleDialog}
              />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getYearMonths().map((month, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-sm font-medium mb-2">
                  {month.toLocaleString('default', { month: 'long' })} {month.getFullYear()}
                </h3>
                <Calendar
                  mode="single"
                  month={month}
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border p-1 scale-90 origin-top-left"
                  disabled={(date) => 
                    date.getMonth() !== month.getMonth() || 
                    date.getFullYear() !== month.getFullYear()
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {calendarView === "year" && (
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Leave Requests</h3>
          <LeaveRequestsList 
            leaveRequests={leaveRequests}
            isAdmin={isAdmin}
            onApprove={handleApprove}
            onDeny={handleDeny}
            onReschedule={openRescheduleDialog}
          />
        </div>
      )}

      <RescheduleDialog 
        open={openReschedule}
        setOpen={setOpenReschedule}
        newStartDate={newStartDate}
        setNewStartDate={setNewStartDate}
        newEndDate={newEndDate}
        setNewEndDate={setNewEndDate}
        onReschedule={handleReschedule}
      />

      {isAdmin && (
        <LeaveReport
          open={openReport}
          setOpen={setOpenReport}
          leaveRequests={leaveRequests}
        />
      )}
    </div>
  );
};

export default LeaveCalendarContainer;
