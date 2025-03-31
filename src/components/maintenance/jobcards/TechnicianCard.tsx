
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Circle } from "lucide-react";
import { getTechnicianJobs } from "../tech/jobs/utils/technicianUtils";

interface JobCounts {
  high: number;
  medium: number;
  low: number;
  completed: number;
}

interface TechnicianCardProps {
  tech: User;
  onViewJobs: (techId: string) => void;
}

const TechnicianCard = ({ tech, onViewJobs }: TechnicianCardProps) => {
  const [jobCounts, setJobCounts] = useState<JobCounts>({ high: 0, medium: 0, low: 0, completed: 0 });
  
  useEffect(() => {
    // Get job counts for this technician
    const techJobs = getTechnicianJobs(tech.id);
    
    // Count jobs by priority and completion status
    const counts = techJobs.reduce((acc: JobCounts, job: any) => {
      // Count by priority for active jobs
      if (job.status !== "completed") {
        acc[job.priority as keyof Pick<JobCounts, 'high' | 'medium' | 'low'>] += 1;
      } else {
        // Count completed jobs
        acc.completed += 1;
      }
      return acc;
    }, { high: 0, medium: 0, low: 0, completed: 0 });
    
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
          <div className="flex items-center gap-2">
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
