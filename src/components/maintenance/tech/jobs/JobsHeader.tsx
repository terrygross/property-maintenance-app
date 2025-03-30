
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const JobsHeader: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Jobs</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default JobsHeader;
