
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/data/mockUsers";

interface TechHeaderProps {
  userId: string;
}

const TechHeader = ({ userId }: TechHeaderProps) => {
  const user = useMemo(() => {
    return MOCK_USERS.find(user => user.id === userId);
  }, [userId]);

  const userInitials = useMemo(() => {
    if (!user) return "JD";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  }, [user]);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={user?.photo_url} alt={user?.first_name} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Maintenance Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user?.first_name} {user?.last_name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => console.log("logout")}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TechHeader;
