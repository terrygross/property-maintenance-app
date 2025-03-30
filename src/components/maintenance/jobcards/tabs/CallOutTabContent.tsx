
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CallOutSchedule from "../CallOutSchedule";

const CallOutTabContent = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <CallOutSchedule />
      </CardContent>
    </Card>
  );
};

export default CallOutTabContent;
