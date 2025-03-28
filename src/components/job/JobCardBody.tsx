
import { Badge } from "@/components/ui/badge";
import { Clock, User, Mail, Bell } from "lucide-react";
import { getAssignedTech, isTechnicianContractor, isTechnicianMaintenanceTech, formatStatus } from "./jobCardUtils";

interface JobCardBodyProps {
  description: string;
  reportDate: string;
  status: string;
  assignedTo?: string;
  emailSent?: boolean;
}

const JobCardBody = ({ 
  description, 
  reportDate, 
  status, 
  assignedTo, 
  emailSent = false 
}: JobCardBodyProps) => {
  // Check if assigned to a contractor
  const assignedTech = getAssignedTech(assignedTo);
  const isContractor = assignedTech && isTechnicianContractor(assignedTech.id);
  const isMaintenanceTech = assignedTech && isTechnicianMaintenanceTech(assignedTech.id);

  return (
    <>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Reported: {reportDate}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> Status: {formatStatus(status)}
        </div>
      </div>
      
      {status !== "unassigned" && assignedTech && (
        <div className="mt-3 text-xs flex items-center">
          {isContractor && (
            <Badge variant={emailSent ? "outline" : "secondary"} className="mr-2 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {emailSent ? "Email Sent" : "Email Pending"}
            </Badge>
          )}
          
          {isMaintenanceTech && (
            <Badge variant="outline" className="mr-2 flex items-center gap-1">
              <Bell className="h-3 w-3" />
              App Notification Sent
            </Badge>
          )}
          
          <div className="flex items-center gap-1 text-gray-500">
            <User className="h-3 w-3" />
            {assignedTech.first_name} {assignedTech.last_name}
          </div>
        </div>
      )}
    </>
  );
};

export default JobCardBody;
