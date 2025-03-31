
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/types/user";

interface TechnicianCardProps {
  tech: User;
  onViewJobs: (techId: string) => void;
}

const TechnicianCard = ({ tech, onViewJobs }: TechnicianCardProps) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center">
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
        <Button size="sm" onClick={() => onViewJobs(tech.id)}>View Jobs</Button>
      </div>
    </div>
  );
};

export default TechnicianCard;
