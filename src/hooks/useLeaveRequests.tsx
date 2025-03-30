
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason: string;
}

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: "1", userId: "1", startDate: new Date(2023, 11, 20), endDate: new Date(2023, 11, 24), status: "pending", reason: "Family vacation" },
    { id: "2", userId: "2", startDate: new Date(2023, 11, 27), endDate: new Date(2023, 11, 31), status: "pending", reason: "Personal time" },
    { id: "3", userId: "3", startDate: new Date(2024, 0, 3), endDate: new Date(2024, 0, 10), status: "pending", reason: "Medical leave" },
  ]);
  const { toast } = useToast();

  const handleLeaveAction = (leaveId: string, action: "approve" | "deny" | "reschedule", newDates?: { startDate: Date, endDate: Date }) => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(request => {
        if (request.id === leaveId) {
          const updatedRequest = { 
            ...request, 
            status: action === "approve" ? "approved" : action === "deny" ? "denied" : "pending"
          };
          
          if (action === "reschedule" && newDates) {
            updatedRequest.startDate = newDates.startDate;
            updatedRequest.endDate = newDates.endDate;
          }
          
          return updatedRequest;
        }
        return request;
      })
    );

    // Display toast notification
    const actionText = action === "approve" ? "approved" : action === "deny" ? "denied" : "rescheduled";
    toast({
      title: `Leave request ${actionText}`,
      description: `The leave request has been ${actionText}.`,
    });
  };

  return {
    leaveRequests,
    handleLeaveAction
  };
}
