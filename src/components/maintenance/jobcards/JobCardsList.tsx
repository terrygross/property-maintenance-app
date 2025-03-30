
import React from "react";
import { Button } from "@/components/ui/button";
import { MOCK_USERS } from "@/data/mockUsers";
import { hasAdminAccess } from "@/types/user";

interface JobCardsListProps {
  userRole?: string;
}

const JobCardsList = ({ userRole = "admin" }: JobCardsListProps) => {
  // Filter maintenance technicians
  const allMaintenanceTechs = MOCK_USERS.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );
  
  // For Basic plan, we should only show 4 technicians
  const maintenanceTechs = allMaintenanceTechs.slice(0, 4);

  // Handle view jobs button click
  const handleViewJobs = (techId: string) => {
    console.log("View jobs for technician:", techId);
    // Implement view jobs functionality
  };

  // Handle assign new job button click
  const handleAssignJob = () => {
    console.log("Assign new job clicked");
    // Implement assign job functionality
  };

  // Check if user has admin access
  const isAdminOrManager = hasAdminAccess(userRole as any);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Job Cards</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {maintenanceTechs.length}/4 technicians (Basic plan)
          </span>
          {isAdminOrManager && (
            <Button variant="outline" size="sm" onClick={handleAssignJob}>Assign New Job</Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {maintenanceTechs.length > 0 ? (
          maintenanceTechs.map(tech => (
            <div key={tech.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{tech.first_name} {tech.last_name}</p>
                  <p className="text-sm text-muted-foreground">{tech.title}</p>
                </div>
                <Button size="sm" onClick={() => handleViewJobs(tech.id)}>View Jobs</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">No maintenance technicians found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCardsList;
