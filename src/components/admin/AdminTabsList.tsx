
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Settings, Building, ClipboardList, BarChart, 
  MessageCircle, Wallet, CheckSquare, FileText, 
  RotateCcw, Trash, FileSpreadsheet, Wrench, 
  CalendarClock, ScrollText
} from "lucide-react";

// Export the tabs data so it can be used in other components (like cards)
export const adminTabs = [
  { id: "overview", label: "Overview", icon: FileSpreadsheet },
  { id: "users", label: "Staff Mgmt", icon: Users },
  { id: "properties", label: "Properties", icon: Building },
  { id: "maintenance", label: "Maintenance", icon: Settings },
  { id: "compliance", label: "Compliance", icon: CheckSquare },
  { id: "maintenance-jobcards", label: "Job Cards", icon: CalendarClock },
  { id: "tech-view", label: "Tech UI", icon: Wrench },
  { id: "reporter", label: "Reported Jobs", icon: ClipboardList },
  { id: "reporter-management", label: "Reporter Mgmt", icon: ScrollText },
  { id: "jobs", label: "Jobs", icon: ClipboardList },
  { id: "reports", label: "Accounting & Reports", icon: BarChart },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "billing", label: "Billing", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logs", label: "Logs", icon: FileText },
  { id: "recycle-bin", label: "Recycle Bin", icon: Trash }
];

// This component will now only be used in the non-overview tabs for navigation
const AdminTabsList = () => {
  return (
    <TabsList className="flex flex-wrap mb-4 bg-transparent p-0 h-auto gap-1">
      {adminTabs.map((tab) => (
        <TabsTrigger 
          key={tab.id} 
          value={tab.id} 
          className="rounded-md data-[state=active]:bg-slate-100"
        >
          <tab.icon className="w-4 h-4 mr-2" />
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default AdminTabsList;
