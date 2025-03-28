
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  property: string;
  reportDate: string;
  priority: "low" | "medium" | "high";
  status: "unassigned" | "assigned" | "in_progress" | "completed";
  onAssign?: (id: string, technicianId: string) => void;
}

// Mock data for technicians
const TECHNICIANS = [
  { id: "tech1", name: "John Smith" },
  { id: "tech2", name: "Sarah Johnson" },
  { id: "tech3", name: "Miguel Rodriguez" },
  { id: "tech4", name: "Lisa Chen" },
];

const JobCard = ({ 
  id, 
  title, 
  description, 
  property, 
  reportDate, 
  priority, 
  status,
  onAssign 
}: JobCardProps) => {
  const [assigning, setAssigning] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState("");
  
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
      
      toast({
        title: "Job Assigned",
        description: `Job has been assigned to ${TECHNICIANS.find(t => t.id === selectedTechnician)?.name}.`,
      });
      
      setAssigning(false);
      setSelectedTechnician("");
    }, 1000);
  };

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
                      {tech.name}
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
