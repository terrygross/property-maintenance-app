
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_USERS } from "@/data/mockUsers";

interface CallOut {
  id: string;
  userId: string;
  date: Date;
}

interface CallOutListProps {
  callOuts: CallOut[];
  isReadOnly?: boolean;
  date?: Date;
  upcomingCallOuts?: CallOut[];
  openScheduleDialog?: () => void;
}

const CallOutList = ({ callOuts, isReadOnly = false, date, upcomingCallOuts = [], openScheduleDialog }: CallOutListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {isReadOnly 
            ? "My Upcoming Call-Out Assignments" 
            : `Call-Out Assignments for ${date?.toLocaleDateString()}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isReadOnly ? (
          upcomingCallOuts.length > 0 ? (
            <div className="space-y-3">
              {upcomingCallOuts.map(callout => (
                <div key={callout.id} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{callout.date.toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">On-call duty</p>
                  </div>
                  <Badge className="bg-blue-500">Scheduled</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming call-outs scheduled for you</p>
            </div>
          )
        ) : (
          callOuts.length > 0 ? (
            <div className="space-y-3">
              {callOuts.map(callout => {
                const tech = MOCK_USERS.find(user => user.id === callout.userId);
                return (
                  <div key={callout.id} className="flex justify-between items-center pb-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{tech?.first_name} {tech?.last_name}</p>
                      <p className="text-sm text-muted-foreground">{tech?.title}</p>
                    </div>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No call-outs scheduled for this date</p>
              <Button 
                className="mt-4" 
                variant="outline" 
                onClick={openScheduleDialog}
              >
                Schedule Now
              </Button>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default CallOutList;
