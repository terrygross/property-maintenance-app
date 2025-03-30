
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EmptyLeaveList from "./EmptyLeaveList";

interface LeaveRequest {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  reason: string;
}

interface LeaveRequestCardProps {
  leaveRequests: LeaveRequest[];
}

const LeaveRequestCard = ({ leaveRequests }: LeaveRequestCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Leave Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {leaveRequests.length === 0 ? (
          <EmptyLeaveList />
        ) : (
          <div className="space-y-4">
            {leaveRequests.map((leave) => (
              <div key={leave.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{leave.reason}</p>
                  </div>
                  <Badge
                    className={`${
                      leave.status === "approved"
                        ? "bg-green-500"
                        : leave.status === "denied"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaveRequestCard;
