
import React from "react";
import { Users, Building, Wrench, BarChart, CreditCard, AlertTriangle, Clipboard } from "lucide-react";
import AdminCard from "./AdminCard";

interface OverviewTabContentProps {
  setActiveTab: (tab: string) => void;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AdminCard 
        title="User Management" 
        description="Manage all user accounts and permissions in the system"
        icon={<Users className="h-6 w-6" />}
        buttonText="Manage Users"
        buttonAction={() => setActiveTab("users")}
      />
      
      <AdminCard 
        title="Property Management" 
        description="Add, edit, and manage properties in your database"
        icon={<Building className="h-6 w-6" />}
        buttonText="Manage Properties"
        buttonAction={() => setActiveTab("properties")}
      />
      
      <AdminCard 
        title="Maintenance Settings" 
        description="Configure maintenance categories and service providers"
        icon={<Wrench className="h-6 w-6" />}
        buttonText="Configure Settings"
        buttonAction={() => setActiveTab("maintenance")}
      />
      
      <AdminCard 
        title="Reports" 
        description="Generate and view maintenance performance reports"
        icon={<BarChart className="h-6 w-6" />}
        buttonText="View Reports"
        buttonAction={() => setActiveTab("reports")}
      />
      
      <AdminCard 
        title="Reporter Station" 
        description="Access the reporter station interface for maintenance issue reporting"
        icon={<Clipboard className="h-6 w-6" />}
        buttonText="Access Reporter Station"
        isLink={true}
        linkTo="/reporter"
      />
      
      <AdminCard 
        title="Billing" 
        description="Manage subscription plans and payment methods"
        icon={<CreditCard className="h-6 w-6" />}
        buttonText="Manage Billing"
        buttonAction={() => setActiveTab("billing")}
      />
      
      <AdminCard 
        title="System Logs" 
        description="View system activity, errors, and user actions"
        icon={<AlertTriangle className="h-6 w-6" />}
        buttonText="View Logs"
        buttonAction={() => setActiveTab("logs")}
      />
    </div>
  );
};

export default OverviewTabContent;
