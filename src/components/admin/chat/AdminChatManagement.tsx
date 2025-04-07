
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";
import { Button } from "@/components/ui/button";
import { Settings, ToggleLeft, Bell } from "lucide-react";
import EnhancedChatInterface from "@/components/chat/EnhancedChatInterface";

const AdminChatManagement = () => {
  const { currentUser } = useAppState();
  const currentUserId = currentUser?.id || "4"; // Default to admin if no current user
  const [activeTab, setActiveTab] = useState<"interface" | "settings" | "notifications">("interface");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chat Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ToggleLeft className="mr-2 h-4 w-4" />
            Enable/Disable Chat
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="interface">Chat Interface</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="interface">
          <Card className="p-6 h-[calc(100vh-300px)]">
            <EnhancedChatInterface currentUserId={currentUserId} isAdmin={true} className="h-full" />
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Chat Settings</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border rounded p-3">
                  <div>
                    <h4 className="font-medium">Enable Chat for All Users</h4>
                    <p className="text-sm text-muted-foreground">Allow all users to access the chat functionality</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between border rounded p-3">
                  <div>
                    <h4 className="font-medium">Message Retention</h4>
                    <p className="text-sm text-muted-foreground">Configure how long messages are stored</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between border rounded p-3">
                  <div>
                    <h4 className="font-medium">Role-based Permissions</h4>
                    <p className="text-sm text-muted-foreground">Set who can chat with whom based on roles</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between border rounded p-3">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified of new messages via email</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between border rounded p-3">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Enable browser push notifications</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminChatManagement;
