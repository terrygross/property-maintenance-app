
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const JobsHeader: React.FC<{
  jobCount?: number;
  isAdmin?: boolean;
}> = ({ jobCount = 0 }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Assigned Jobs {jobCount > 0 && `(${jobCount})`}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default JobsHeader;
