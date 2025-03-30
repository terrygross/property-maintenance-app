
import React, { useState } from "react";
import LeaveRequestForm from "@/components/maintenance/jobcards/leave/LeaveRequestForm";
import LeaveHeader from "./leave/LeaveHeader";
import LeaveRequestsLayout from "./leave/LeaveRequestsLayout";

interface TechLeaveTabProps {
  leaveRequests: Array<{
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    status: string;
    reason: string;
  }>;
}

const TechLeaveTab = ({ leaveRequests }: TechLeaveTabProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [openRequest, setOpenRequest] = useState(false);

  // Add a new leave request for testing
  const testLeaveRequests = [
    ...leaveRequests,
    {
      id: "3",
      userId: "1",
      startDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)), // 7 days from now
      endDate: new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000)), // 14 days from now
      status: "pending",
      reason: "Testing leave request"
    }
  ];

  return (
    <div className="space-y-4">
      <LeaveHeader setOpenRequest={setOpenRequest} />
      <LeaveRequestsLayout 
        date={date}
        setDate={setDate}
        leaveRequests={testLeaveRequests}
      />
      <LeaveRequestForm
        openRequest={openRequest}
        setOpenRequest={setOpenRequest}
      />
    </div>
  );
};

export default TechLeaveTab;
