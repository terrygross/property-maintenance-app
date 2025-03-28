
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MOCK_USERS } from "@/data/mockUsers";

interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason?: string;
}

interface LeaveRequestsListProps {
  leaveRequests: LeaveRequest[];
  isAdmin: boolean;
  onApprove: (leaveId: string) => void;
  onDeny: (leaveId: string) => void;
  onReschedule: (leave: LeaveRequest) => void;
}

const LeaveRequestsList = ({ 
  leaveRequests, 
  isAdmin, 
  onApprove, 
  onDeny, 
  onReschedule 
}: LeaveRequestsListProps) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "approved": return "bg-green-100 text-green-800";
      case "denied": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-4">Leave Requests</h4>
      {leaveRequests.length > 0 ? (
        leaveRequests.map(leave => {
          const tech = MOCK_USERS.find(user => user.id === leave.userId);
          return (
            <div key={leave.id} className="flex justify-between items-center mb-3 pb-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{tech?.first_name} {tech?.last_name}</p>
                <p className="text-sm text-muted-foreground">
                  {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                </p>
                {leave.reason && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Reason:</span> {leave.reason}
                  </p>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-end md:items-center gap-2">
                <Badge className={getStatusColor(leave.status)}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </Badge>
                
                {isAdmin && leave.status === "pending" && (
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => onApprove(leave.id)}>
                      <CheckIcon className="h-3 w-3" />
                      <span>Approve</span>
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => onDeny(leave.id)}>
                      <X className="h-3 w-3" />
                      <span>Deny</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => onReschedule(leave)}
                    >
                      <Clock className="h-3 w-3" />
                      <span>Reschedule</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No leave requests found</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestsList;
