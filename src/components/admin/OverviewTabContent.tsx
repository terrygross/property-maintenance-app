
import React from "react";
import { Users, Building, Wrench, BarChart, CreditCard, AlertTriangle, Clipboard, Calendar, Layout, UserCog } from "lucide-react";
import AdminCard from "./AdminCard";

interface OverviewTabContentProps {
  setActiveTab: (tab: string) => void;
}

const OverviewTabContent = ({ setActiveTab }: OverviewTabContentProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <AdminCard 
        title="User Management" 
        description="Manage all user accounts and permissions in the system"
        icon={<Users className="h-5 w-5" />}
        buttonText="Manage Users"
        buttonAction={() => setActiveTab("users")}
      />
      
      <AdminCard 
        title="Property Management" 
        description="Add, edit, and manage properties in your database"
        icon={<Building className="h-5 w-5" />}
        buttonText="Manage Properties"
        buttonAction={() => setActiveTab("properties")}
      />
      
      <AdminCard 
        title="Maintenance Settings" 
        description="Configure maintenance categories and service providers"
        icon={<Wrench className="h-5 w-5" />}
        buttonText="Configure Settings"
        buttonAction={() => setActiveTab("maintenance")}
      />
      
      <AdminCard 
        title="Reports" 
        description="Generate and view maintenance performance reports"
        icon={<BarChart className="h-5 w-5" />}
        buttonText="View Reports"
        buttonAction={() => setActiveTab("reports")}
      />
      
      <AdminCard 
        title="Reporter Jobs" 
        description="View and manage reported maintenance issues"
        icon={<Clipboard className="h-5 w-5" />}
        buttonText="View Reporter Jobs"
        buttonAction={() => setActiveTab("reporter")}
      />
      
      <AdminCard 
        title="Reporter Management" 
        description="Manage reporter accounts and access based on your subscription"
        icon={<UserCog className="h-5 w-5" />}
        buttonText="Manage Reporters"
        buttonAction={() => setActiveTab("reporter-management")}
      />
      
      <AdminCard 
        title="Maintenance Job Cards" 
        description="View job cards, manage leave calendar, and schedule call-out rota"
        icon={<Calendar className="h-5 w-5" />}
        buttonText="Access Job Cards"
        buttonAction={() => setActiveTab("maintenance-jobcards")}
      />
      
      <AdminCard 
        title="Maintenance Technician UI" 
        description="Preview the interface used by maintenance technicians"
        icon={<Layout className="h-5 w-5" />}
        buttonText="View Tech Interface"
        isLink={true}
        linkTo="/maintenance"
      />
      
      <AdminCard 
        title="Reporter Station" 
        description="Access the reporter station interface for maintenance issue reporting"
        icon={<Clipboard className="h-5 w-5" />}
        buttonText="Access Reporter Station"
        isLink={true}
        linkTo="/reporter"
      />
      
      <AdminCard 
        title="Billing" 
        description="Manage subscription plans and payment methods"
        icon={<CreditCard className="h-5 w-5" />}
        buttonText="Manage Billing"
        buttonAction={() => setActiveTab("billing")}
      />
      
      <AdminCard 
        title="System Logs" 
        description="View system activity, errors, and user actions"
        icon={<AlertTriangle className="h-5 w-5" />}
        buttonText="View Logs"
        buttonAction={() => setActiveTab("logs")}
      />
    </div>
  );
};

export default OverviewTabContent;
