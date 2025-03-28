
import React from "react";
import { Button } from "@/components/ui/button";
import { MOCK_USERS } from "@/data/mockUsers";

const JobCardsList = () => {
  // Filter maintenance technicians
  const maintenanceTechs = MOCK_USERS.filter(user => 
    user.role === "maintenance_tech" || user.role === "contractor"
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Job Cards</h3>
        <Button variant="outline" size="sm">Assign New Job</Button>
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
                <Button size="sm">View Jobs</Button>
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
