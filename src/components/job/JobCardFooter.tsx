
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, User, ArrowUpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";

interface JobCardFooterProps {
  id: string;
  status: string;
  priority: string;
  assignedTo?: string;
  onAssign?: (id: string, technicianId: string, priority: string) => void;
  onResendEmail?: (id: string, technicianId: string) => void;
}

const JobCardFooter = ({ 
  id, 
  status, 
  priority: initialPriority,
  assignedTo,
  onAssign,
  onResendEmail 
}: JobCardFooterProps) => {
  const [assigning, setAssigning] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(initialPriority || "medium");
  const [sendingEmail, setSendingEmail] = useState(false);
  const { users } = useAppState();
  
  // Filter users to get only technicians and contractors
  const TECHNICIANS = users.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

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
        onAssign(id, selectedTechnician, selectedPriority);
      }
      
      const selectedTech = TECHNICIANS.find(t => t.id === selectedTechnician);
      const techName = selectedTech ? `${selectedTech.first_name} ${selectedTech.last_name}` : "the technician";
      
      toast({
        title: "Job Assigned",
        description: `Job has been assigned to ${techName} with ${selectedPriority} priority.`,
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
  const assignedTechnician = assignedTo ? TECHNICIANS.find(t => t.id === assignedTo) : null;
  const isContractor = assignedTechnician?.role === "contractor";

  if (status === "unassigned") {
    return (
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

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-blue-500" />
                Low Priority
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-yellow-500" />
                Medium Priority
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="h-4 w-4 text-red-500" />
                High Priority
              </div>
            </SelectItem>
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
    );
  } 
  
  if (isContractor) {
    return (
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2" 
        onClick={handleResendEmail}
        disabled={sendingEmail}
      >
        <RefreshCw className={`h-4 w-4 ${sendingEmail ? 'animate-spin' : ''}`} />
        {sendingEmail ? "Sending..." : "Resend Job Email"}
      </Button>
    );
  }
  
  return (
    <Button variant="outline" className="w-full" disabled>
      Already Assigned
    </Button>
  );
};

export default JobCardFooter;
