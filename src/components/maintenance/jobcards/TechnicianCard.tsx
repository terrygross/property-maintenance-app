
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Circle, Clock } from "lucide-react";
import { getTechnicianJobs } from "../tech/jobs/utils/technicianUtils";

interface JobCounts {
  high: number;
  medium: number;
  low: number;
  completed: number;
  inProgress: number;
  assigned: number;
}

interface TechnicianCardProps {
  tech: User;
  onViewJobs: (techId: string) => void;
}

const TechnicianCard = ({ tech, onViewJobs }: TechnicianCardProps) => {
  const [jobCounts, setJobCounts] = useState<JobCounts>({
    high: 0,
    medium: 0,
    low: 0,
    completed: 0,
    inProgress: 0,
    assigned: 0
  });
  
  useEffect(() => {
    // Get job counts for this technician
    const techJobs = getTechnicianJobs(tech.id);
    
    // Count jobs by priority and status
    const counts = techJobs.reduce((acc: JobCounts, job: any) => {
      // Count by status
      if (job.status === "in_progress") {
        acc.inProgress += 1;
      } else if (job.status === "assigned") {
        acc.assigned += 1;
      } else if (job.status === "completed") {
        acc.completed += 1;
      }
      
      // Count active jobs by priority (both assigned and in progress)
      if (job.status !== "completed") {
        acc[job.priority as keyof Pick<JobCounts, 'high' | 'medium' | 'low'>] += 1;
      }
      
      return acc;
    }, { high: 0, medium: 0, low: 0, completed: 0, inProgress: 0, assigned: 0 });
    
    setJobCounts(counts);
  }, [tech.id]);
  
  const totalActiveJobs = jobCounts.high + jobCounts.medium + jobCounts.low;

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={tech.photo_url} alt={`${tech.first_name} ${tech.last_name}`} />
            <AvatarFallback>{tech.first_name?.[0]}{tech.last_name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{tech.first_name} {tech.last_name}</p>
            <p className="text-sm text-muted-foreground">
              {tech.title} 
              {tech.role === "contractor" && " (Contractor)"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Priority badges */}
            {jobCounts.high > 0 && (
              <Badge variant="outline" className="bg-red-50 text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {jobCounts.high}
              </Badge>
            )}
            
            {jobCounts.medium > 0 && (
              <Badge variant="outline" className="bg-amber-50 text-amber-600 flex items-center gap-1">
                <Circle className="h-3 w-3" />
                {jobCounts.medium}
              </Badge>
            )}
            
            {jobCounts.low > 0 && (
              <Badge variant="outline" className="bg-green-50 text-green-600 flex items-center gap-1">
                <Circle className="h-3 w-3" />
                {jobCounts.low}
              </Badge>
            )}
            
            {/* Status badges */}
            {jobCounts.inProgress > 0 && (
              <Badge variant="outline" className="bg-purple-50 text-purple-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {jobCounts.inProgress}
              </Badge>
            )}
            
            {jobCounts.completed > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {jobCounts.completed}
              </Badge>
            )}
          </div>
          
          <Button 
            size="sm" 
            onClick={() => onViewJobs(tech.id)}
            className="flex items-center gap-1"
          >
            View Jobs
            {totalActiveJobs > 0 && (
              <span className="ml-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full px-1.5 py-0.5">
                {totalActiveJobs}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;
