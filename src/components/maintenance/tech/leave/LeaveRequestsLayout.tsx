
import React from "react";
import LeaveCalendarCard from "./LeaveCalendarCard";
import LeaveRequestCard from "./LeaveRequestCard";

interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason: string;
}

interface LeaveRequestsLayoutProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  leaveRequests: LeaveRequest[];
}

const LeaveRequestsLayout = ({ date, setDate, leaveRequests }: LeaveRequestsLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LeaveCalendarCard date={date} setDate={setDate} />
      <LeaveRequestCard leaveRequests={leaveRequests} />
    </div>
  );
};

export default LeaveRequestsLayout;
