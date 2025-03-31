
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResetJobsButton from "@/components/admin/ResetJobsButton";

const DashboardActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Actions</CardTitle>
        <CardDescription>
          Tools to manage and reset system data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-medium">Reset Jobs</h3>
          <p className="text-sm text-muted-foreground">
            This will delete all existing jobs and create new mock data for testing purposes.
          </p>
          <div className="mt-2">
            <ResetJobsButton variant="destructive" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
