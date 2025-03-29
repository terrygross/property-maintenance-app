
import { Badge } from "@/components/ui/badge";
import { Clock, User, Mail, Bell } from "lucide-react";
import { isTechnicianContractor, isTechnicianMaintenanceTech, formatStatus } from "./jobCardUtils";
import { useAppState } from "@/context/AppStateContext";

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
  const { users } = useAppState();
  
  // Find the assigned technician if there is one
  const assignedTech = assignedTo ? users.find(user => user.id === assignedTo) : null;
  
  // Check technician roles
  const isContractor = assignedTech?.role === "contractor";
  const isMaintenanceTech = assignedTech?.role === "maintenance_tech";

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
