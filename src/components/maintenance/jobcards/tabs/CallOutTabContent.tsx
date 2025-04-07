
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CallOutSchedule from "../CallOutSchedule";
import { UserRole } from "@/types/user";

interface CallOutTabContentProps {
  userRole: UserRole;
}

const CallOutTabContent = ({ userRole }: CallOutTabContentProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <CallOutSchedule userRole={userRole} />
      </CardContent>
    </Card>
  );
};

export default CallOutTabContent;
