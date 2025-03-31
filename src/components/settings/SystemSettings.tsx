
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSystemSettings } from "@/hooks/settings/useSystemSettings";
import { Save, RotateCcw } from "lucide-react";
import GeneralSettingsTab from "./tabs/GeneralSettingsTab";
import SecuritySettingsTab from "./tabs/SecuritySettingsTab";
import MaintenanceSettingsTab from "./tabs/MaintenanceSettingsTab";
import IntegrationSettingsTab from "./tabs/IntegrationSettingsTab";
import NotificationSettingsTab from "./tabs/NotificationSettingsTab";
import ThemeSettingsTab from "./tabs/ThemeSettingsTab";
import SettingsHeader from "./SettingsHeader";

const SystemSettings = () => {
  const {
    settings,
    activeSection,
    setActiveSection,
    updateSettings,
    saveSettings,
    resetSettings,
    isSaving,
  } = useSystemSettings();

  const handleTabChange = (value: string) => {
    setActiveSection(value as keyof typeof settings);
  };

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="System Settings"
        description="Configure global parameters for your maintenance system"
      />

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={resetSettings}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button
          onClick={saveSettings}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <Tabs
          value={activeSection}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="notification">Notifications</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>
          <CardContent className="pt-6">
            <TabsContent value="general" className="mt-0">
              <GeneralSettingsTab
                settings={settings.general}
                updateSettings={(values) => updateSettings("general", values)}
              />
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <SecuritySettingsTab
                settings={settings.security}
                updateSettings={(values) => updateSettings("security", values)}
              />
            </TabsContent>
            
            <TabsContent value="maintenance" className="mt-0">
              <MaintenanceSettingsTab
                settings={settings.maintenance}
                updateSettings={(values) => updateSettings("maintenance", values)}
              />
            </TabsContent>
            
            <TabsContent value="integration" className="mt-0">
              <IntegrationSettingsTab
                settings={settings.integration}
                updateSettings={(values) => updateSettings("integration", values)}
              />
            </TabsContent>
            
            <TabsContent value="notification" className="mt-0">
              <NotificationSettingsTab
                settings={settings.notification}
                updateSettings={(values) => updateSettings("notification", values)}
              />
            </TabsContent>
            
            <TabsContent value="theme" className="mt-0">
              <ThemeSettingsTab
                settings={settings.theme}
                updateSettings={(values) => updateSettings("theme", values)}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default SystemSettings;
