
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LeaveRequestForm from "@/components/maintenance/jobcards/leave/LeaveRequestForm";

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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Leave Schedule</h2>
        <Button onClick={() => setOpenRequest(true)}>Request Leave</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border p-3"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {testLeaveRequests.length === 0 ? (
              <div className="text-center p-6">
                <p className="text-muted-foreground">No leave requests found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testLeaveRequests.map((leave) => (
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
      </div>
      <LeaveRequestForm
        openRequest={openRequest}
        setOpenRequest={setOpenRequest}
      />
    </div>
  );
};

export default TechLeaveTab;
