
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CallOutSchedule from "@/components/maintenance/jobcards/CallOutSchedule";

const TechCallOutTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Call-Out Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <CallOutSchedule isReadOnly={true} />
      </CardContent>
    </Card>
  );
};

export default TechCallOutTab;
