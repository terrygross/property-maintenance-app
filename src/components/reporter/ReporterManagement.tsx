
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReporterStationManagement from "./ReporterStationManagement";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Clipboard } from "lucide-react";

const ReporterManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className="grid gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reporter Stations
                </CardTitle>
                <Clipboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Basic plan limit: 2 stations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reporter Accounts
                </CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active reporter user accounts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Tabs defaultValue="stations" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="stations">Reporter Stations</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="stations" className="space-y-4">
          <ReporterStationManagement />
        </TabsContent>
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Settings</CardTitle>
              <CardDescription>
                Manage your reporter subscription plan and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Current Plan: Basic</p>
                <p className="text-sm text-muted-foreground">
                  Your plan allows for up to 2 reporter stations.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Next billing date: June 15, 2023</p>
                <p className="text-sm text-muted-foreground">
                  Contact support to upgrade your plan if you need more reporter stations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReporterManagement;
