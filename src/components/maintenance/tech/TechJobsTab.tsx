
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  title: string;
  location: string;
  priority: string;
  dueDate: Date;
}

interface TechJobsTabProps {
  assignedJobs: Job[];
}

const TechJobsTab = ({ assignedJobs }: TechJobsTabProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {assignedJobs.length === 0 ? (
          <div className="text-center p-6">
            <p className="text-muted-foreground">No jobs currently assigned</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignedJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{job.title}</h3>
                      <Badge className={getPriorityColor(job.priority)}>
                        {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                    <p className="text-xs mt-2">
                      Due: {job.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechJobsTab;
