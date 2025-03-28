import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Building, CreditCard, Users, Settings, AlertTriangle, PlusCircle } from "lucide-react";
import AdminTab from "./AdminTab";
import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your maintenance system</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>New Task</span>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="mb-6 overflow-x-auto">
          <TabsList className="flex w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="jobcards">Job Cards</TabsTrigger>
            <TabsTrigger value="reporter">Reporter</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
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
              icon={<Settings className="h-6 w-6" />}
              buttonText="Configure Settings"
              buttonAction={() => setActiveTab("maintenance")}
            />
            
            <AdminCard 
              title="Reports" 
              description="Generate and view maintenance performance reports"
              icon={<BarChart className="h-6 w-6" />}
              buttonText="View Reports"
              buttonAction={() => setActiveTab("reports")}
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
        </TabsContent>

        <TabsContent value="users">
          <AdminTab title="User Management" description="Add, edit, and manage system users and their permissions">
            <UserManagement />
          </AdminTab>
        </TabsContent>

        <TabsContent value="properties">
          <AdminTab title="Property Management" description="Manage your property database">
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Add, edit, and manage properties in your system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Property management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="maintenance">
          <AdminTab title="Maintenance Settings" description="Configure maintenance system parameters">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Settings</CardTitle>
                <CardDescription>Configure maintenance categories, providers, and workflow rules</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Maintenance configuration functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="reports">
          <AdminTab title="Reports" description="Access reporting functionality">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view maintenance performance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reporting functionality can be accessed here.</p>
                <Button asChild className="mt-4">
                  <Link to="/reporter">Open Reporter</Link>
                </Button>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="billing">
          <AdminTab title="Billing Management" description="Manage subscription and payment information">
            <Card>
              <CardHeader>
                <CardTitle>Billing Management</CardTitle>
                <CardDescription>View and manage subscription plans and payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Billing management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="settings">
          <AdminTab title="System Settings" description="Configure global system settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure global parameters for your maintenance system</CardDescription>
              </CardHeader>
              <CardContent>
                <p>System settings functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="logs">
          <AdminTab title="System Logs" description="View system activity records">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>View system events, errors, and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>System logs functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="jobcards">
          <AdminTab title="Job Cards" description="Manage maintenance job cards">
            <Card>
              <CardHeader>
                <CardTitle>Job Cards Management</CardTitle>
                <CardDescription>Assign and manage maintenance job cards</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Job card management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="reporter">
          <AdminTab title="Reporter" description="Reporter management page">
            <Card>
              <CardHeader>
                <CardTitle>Reporter Management</CardTitle>
                <CardDescription>View and manage reporter stations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reporter management functionality will be implemented here.</p>
                <Button asChild className="mt-4">
                  <Link to="/reporter">Go to Reporter Page</Link>
                </Button>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="jobs">
          <AdminTab title="Jobs" description="Manage maintenance jobs">
            <Card>
              <CardHeader>
                <CardTitle>Jobs Management</CardTitle>
                <CardDescription>View and manage maintenance jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Jobs management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>

        <TabsContent value="backup">
          <AdminTab title="Backup & Restore" description="Backup and restore system data">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>Backup and restore data from cloud storage</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Backup and restore functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </AdminTab>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonAction: () => void;
  isLink?: boolean;
  linkTo?: string;
}

const AdminCard = ({ title, description, icon, buttonText, buttonAction, isLink, linkTo }: AdminCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {isLink && linkTo ? (
          <Button asChild className="w-full">
            <Link to={linkTo}>{buttonText}</Link>
          </Button>
        ) : (
          <Button className="w-full" onClick={buttonAction}>
            {buttonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AdminDashboard;
