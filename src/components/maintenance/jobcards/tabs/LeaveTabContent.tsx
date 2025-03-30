
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LeaveCalendar from "../LeaveCalendar";

interface LeaveTabContentProps {
  leaveRequests: {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    status: string;
    reason?: string;
  }[];
  onLeaveAction: (leaveId: string, action: "approve" | "deny" | "reschedule", newDates?: { startDate: Date, endDate: Date }) => void;
  isAdmin: boolean;
}

const LeaveTabContent = ({ leaveRequests, onLeaveAction, isAdmin }: LeaveTabContentProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <LeaveCalendar 
          leaveRequests={leaveRequests} 
          onLeaveAction={onLeaveAction} 
          isAdmin={isAdmin} 
        />
      </CardContent>
    </Card>
  );
};

export default LeaveTabContent;
