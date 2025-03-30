
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Building, Wrench, BarChart, CreditCard, 
  AlertTriangle, ClipboardList, Calendar, Settings, 
  ArchiveRestore, MessageCircle, Clipboard, UserCog,
  CheckSquare
} from "lucide-react";

const AdminTabsList = () => {
  return (
    <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8 overflow-x-auto">
      <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="users" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Users</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="properties" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <span className="hidden sm:inline">Properties</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="maintenance" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Wrench className="h-4 w-4" />
          <span className="hidden sm:inline">Maintenance</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="compliance" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Compliance</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="reporter" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Clipboard className="h-4 w-4" />
          <span className="hidden sm:inline">Reported Jobs</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="reporter-management" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <UserCog className="h-4 w-4" />
          <span className="hidden sm:inline">Reporter Mgmt</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="maintenance-jobcards" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Job Cards</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="chat" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Chat</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="jobs" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          <span className="hidden sm:inline">Jobs</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="reports" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span className="hidden sm:inline">Reports</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="billing" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Billing</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="settings" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="logs" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="hidden sm:inline">Logs</span>
        </span>
      </TabsTrigger>
      
      <TabsTrigger value="backup" className="data-[state=active]:bg-primary/10">
        <span className="flex items-center gap-2">
          <ArchiveRestore className="h-4 w-4" />
          <span className="hidden sm:inline">Backup</span>
        </span>
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabsList;
