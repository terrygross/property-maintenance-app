
import React from "react";
import LeaveCalendarContainer from "./leave/LeaveCalendarContainer";

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

const LeaveCalendar = ({ 
  leaveRequests = [], 
  onLeaveAction, 
  isAdmin = false 
}: LeaveCalendarProps) => {
  return (
    <LeaveCalendarContainer
      leaveRequests={leaveRequests}
      onLeaveAction={onLeaveAction}
      isAdmin={isAdmin}
    />
  );
};

export default LeaveCalendar;
