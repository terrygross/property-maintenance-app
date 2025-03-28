
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import LeaveRequestsList from "./LeaveRequestsList";
import LeaveRequestForm from "./LeaveRequestForm";
import RescheduleDialog from "./RescheduleDialog";

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
  const [openRequest, setOpenRequest] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Leave Calendar</h3>
        <LeaveRequestForm 
          openRequest={openRequest} 
          setOpenRequest={setOpenRequest} 
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
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
      </div>

      <RescheduleDialog 
        open={openReschedule}
        setOpen={setOpenReschedule}
        newStartDate={newStartDate}
        setNewStartDate={setNewStartDate}
        newEndDate={newEndDate}
        setNewEndDate={setNewEndDate}
        onReschedule={handleReschedule}
      />
    </div>
  );
};

export default LeaveCalendarContainer;
