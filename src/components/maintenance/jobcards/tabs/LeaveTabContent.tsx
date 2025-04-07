
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LeaveCalendar from "../LeaveCalendar";
import { UserRole } from "@/types/user";

interface LeaveTabContentProps {
  userRole: UserRole;
  leaveRequests?: {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    status: string;
    reason?: string;
  }[];
  onLeaveAction?: (leaveId: string, action: "approve" | "deny" | "reschedule", newDates?: { startDate: Date, endDate: Date }) => void;
  isAdmin?: boolean;
}

const LeaveTabContent = ({ 
  userRole,
  leaveRequests = [], 
  onLeaveAction, 
  isAdmin = false 
}: LeaveTabContentProps) => {
  // Derive isAdmin from userRole if not explicitly provided
  const effectiveIsAdmin = isAdmin || userRole === "admin" || userRole === "maintenance_manager";
  
  return (
    <Card>
      <CardContent className="pt-6">
        <LeaveCalendar 
          leaveRequests={leaveRequests} 
          onLeaveAction={onLeaveAction} 
          isAdmin={effectiveIsAdmin} 
        />
      </CardContent>
    </Card>
  );
};

export default LeaveTabContent;
