
import React from "react";

interface AdminTabProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AdminTab = ({ title, description, children }: AdminTabProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AdminTab;
