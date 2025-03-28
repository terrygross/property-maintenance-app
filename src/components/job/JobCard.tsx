
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, MapPin, RefreshCw, Mail, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_USERS } from "@/data/mockUsers";

export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  property: string;
  reportDate: string;
  priority: "low" | "medium" | "high";
  status: "unassigned" | "assigned" | "in_progress" | "completed";
  assignedTo?: string;
  emailSent?: boolean;
  onAssign?: (id: string, technicianId: string) => void;
  onResendEmail?: (id: string, technicianId: string) => void;
}

// Filter technicians from MOCK_USERS
const TECHNICIANS = MOCK_USERS.filter(user => 
  user.role === "maintenance_tech" || user.role === "contractor"
);

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
  const [assigning, setAssigning] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const handleAssign = () => {
    if (!selectedTechnician) {
      toast({
        title: "No technician selected",
        description: "Please select a technician to assign this job to.",
        variant: "destructive",
      });
      return;
    }

    setAssigning(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onAssign) {
        onAssign(id, selectedTechnician);
      }
      
      const selectedTech = TECHNICIANS.find(t => t.id === selectedTechnician);
      const techName = selectedTech ? `${selectedTech.first_name} ${selectedTech.last_name}` : "the technician";
      
      toast({
        title: "Job Assigned",
        description: `Job has been assigned to ${techName}.`,
      });
      
      setAssigning(false);
      setSelectedTechnician("");
    }, 1000);
  };

  const handleResendEmail = () => {
    if (!assignedTo) return;
    
    setSendingEmail(true);
    
    // Simulate API call for resending email
    setTimeout(() => {
      if (onResendEmail) {
        onResendEmail(id, assignedTo);
      }
      
      const assignedTech = TECHNICIANS.find(t => t.id === assignedTo);
      const techName = assignedTech ? `${assignedTech.first_name} ${assignedTech.last_name}` : "the contractor";
      
      toast({
        title: "Email Resent",
        description: `Job details have been resent to ${techName}.`,
      });
      
      setSendingEmail(false);
    }, 1500);
  };

  // Check if assigned to a contractor
  const assignedTech = assignedTo ? TECHNICIANS.find(t => t.id === assignedTo) : null;
  const isContractor = assignedTech?.role === "contractor";
  const isMaintenanceTech = assignedTech?.role === "maintenance_tech";

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
        <p className="text-sm text-gray-700 mb-3">{description}</p>
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> Reported: {reportDate}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Status: {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
      </CardContent>
      <CardFooter>
        {status === "unassigned" ? (
          <div className="w-full space-y-2">
            <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
              <SelectTrigger>
                <SelectValue placeholder="Select technician" />
              </SelectTrigger>
              <SelectContent>
                {TECHNICIANS.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {tech.first_name} {tech.last_name} ({tech.title})
                      {tech.role === "contractor" && " - Contractor"}
                      {tech.role === "maintenance_tech" && " - In-house"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              className="w-full" 
              onClick={handleAssign} 
              disabled={assigning || !selectedTechnician}
            >
              {assigning ? "Assigning..." : "Assign Job"}
            </Button>
          </div>
        ) : isContractor ? (
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2" 
            onClick={handleResendEmail}
            disabled={sendingEmail}
          >
            <RefreshCw className={`h-4 w-4 ${sendingEmail ? 'animate-spin' : ''}`} />
            {sendingEmail ? "Sending..." : "Resend Job Email"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Already Assigned
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
