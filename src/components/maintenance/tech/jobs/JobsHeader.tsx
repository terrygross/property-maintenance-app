
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/data/mockUsers";

interface JobsHeaderProps {
  jobCount?: number;
  isAdmin?: boolean;
  userId?: string;
}

const JobsHeader: React.FC<JobsHeaderProps> = ({ jobCount = 0, userId }) => {
  // Find the current technician user if userId is provided
  const technician = userId ? MOCK_USERS.find(user => user.id === userId) : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          {technician && (
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={technician.photo_url} alt={`${technician.first_name} ${technician.last_name}`} />
              <AvatarFallback>{technician.first_name?.[0]}{technician.last_name?.[0]}</AvatarFallback>
            </Avatar>
          )}
          <CardTitle>Assigned Jobs {jobCount > 0 && `(${jobCount})`}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};

export default JobsHeader;
