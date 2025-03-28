
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserPlus, AlertCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import UserTable from "@/components/users/UserTable";
import UserFormDialog from "@/components/users/UserFormDialog";
import { useUserManagement } from "@/hooks/useUserManagement";
import { User } from "@/types/user";

const ReporterManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Mock subscription data
  const subscription = {
    plan: "Professional",
    reporterSlots: 10,
    usedSlots: 6,
    expiresAt: new Date("2024-12-31")
  };

  // Use user management hook but filter for reporters only
  const {
    users,
    searchQuery,
    selectedUser,
    handleSearch,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser,
  } = useUserManagement();

  // Filter to show only reporters
  const reporters = users.filter(user => user.role === "reporter");

  const handleAddReporter = () => {
    // Pre-set the role to reporter in the form
    const newReporter: Partial<User> = {
      role: "reporter"
    };
    
    setIsFormOpen(true);
  };

  const canAddMoreReporters = reporters.length < subscription.reporterSlots;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>
            Your current plan and reporter slot usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Current Plan</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{subscription.plan}</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="#" className="flex items-center gap-1">
                Manage Plan <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Reporter Slots</span>
              <span className="text-sm text-muted-foreground">
                {reporters.length} / {subscription.reporterSlots} used
              </span>
            </div>
            <Progress value={(reporters.length / subscription.reporterSlots) * 100} className="h-2" />
          </div>

          <div className="text-sm text-muted-foreground">
            Plan expires on {subscription.expiresAt.toLocaleDateString()}
          </div>
        </CardContent>
      </Card>

      {!canAddMoreReporters && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Slot limit reached</AlertTitle>
          <AlertDescription>
            You've used all available reporter slots in your current plan.
            Upgrade your subscription to add more reporters.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Reporter Accounts</h2>
        <Button 
          onClick={handleAddReporter} 
          disabled={!canAddMoreReporters}
          className="w-full sm:w-auto"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Reporter
        </Button>
      </div>

      <UserTable 
        users={reporters}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <div className="flex justify-between items-center mt-8">
        <h3 className="text-lg font-semibold">Reporter Station Access</h3>
        <Button asChild variant="outline">
          <Link to="/reporter" className="flex items-center gap-1">
            Access Reporter Station <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <UserFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        selectedUser={selectedUser}
        onSave={handleSaveUser}
        onCancel={() => setIsFormOpen(false)}
        defaultRole="reporter"
      />
    </div>
  );
};

export default ReporterManagement;
