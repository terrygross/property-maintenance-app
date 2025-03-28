
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import JobCardBody from "./JobCardBody";
import JobCardFooter from "./JobCardFooter";
import { getPriorityColor } from "./jobCardUtils";
import { JobCardProps } from "./jobCardTypes";

const JobCard = ({ 
  id, 
  title, 
  description, 
  property, 
  reportDate, 
  priority, 
  status,
  assignedTo,
  emailSent = false,
  onAssign,
  onResendEmail
}: JobCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge className={getPriorityColor(priority)}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3" /> {property}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <JobCardBody 
          description={description}
          reportDate={reportDate}
          status={status}
          assignedTo={assignedTo}
          emailSent={emailSent}
        />
      </CardContent>
      <CardFooter>
        <JobCardFooter 
          id={id}
          status={status}
          assignedTo={assignedTo}
          onAssign={onAssign}
          onResendEmail={onResendEmail}
        />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
