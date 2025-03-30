
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import JobCardsList from "../JobCardsList";
import { UserRole } from "@/types/user";

interface JobCardsTabContentProps {
  userRole: UserRole;
}

const JobCardsTabContent = ({ userRole }: JobCardsTabContentProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <JobCardsList userRole={userRole} />
      </CardContent>
    </Card>
  );
};

export default JobCardsTabContent;
