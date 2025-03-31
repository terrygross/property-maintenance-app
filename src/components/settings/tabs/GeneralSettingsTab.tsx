
import React from "react";
import { GeneralSettings } from "@/hooks/settings/useSystemSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface GeneralSettingsTabProps {
  settings: GeneralSettings;
  updateSettings: (values: Partial<GeneralSettings>) => void;
}

const timezones = [
  "UTC",
  "UTC+1:00",
  "UTC+2:00",
  "UTC+3:00",
  "UTC+4:00",
  "UTC+5:00",
  "UTC+6:00",
  "UTC+7:00",
  "UTC+8:00",
  "UTC+9:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
  "UTC-1:00",
  "UTC-2:00",
  "UTC-3:00",
  "UTC-4:00",
  "UTC-5:00",
  "UTC-6:00",
  "UTC-7:00",
  "UTC-8:00",
  "UTC-9:00",
  "UTC-10:00",
  "UTC-11:00",
  "UTC-12:00",
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ar", label: "Arabic" },
];

const emailTemplates = [
  { value: "default", label: "Default Template" },
  { value: "minimal", label: "Minimal" },
  { value: "corporate", label: "Corporate" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
];

const GeneralSettingsTab = ({ settings, updateSettings }: GeneralSettingsTabProps) => {
  const handleChange = (field: keyof GeneralSettings, value: string) => {
    updateSettings({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Branding</h3>
        <p className="text-sm text-muted-foreground">
          Configure how your system appears to users
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="systemName">System Name</Label>
            <Input
              id="systemName"
              value={settings.systemName}
              onChange={(e) => handleChange("systemName", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              value={settings.logoUrl}
              onChange={(e) => handleChange("logoUrl", e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mt-6">Regional Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure default regional settings for all users
          </p>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timezone">Default Timezone</Label>
            <Select
              value={settings.defaultTimezone}
              onValueChange={(value) => handleChange("defaultTimezone", value)}
            >
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem key={timezone} value={timezone}>
                    {timezone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Default Language</Label>
            <Select
              value={settings.defaultLanguage}
              onValueChange={(value) => handleChange("defaultLanguage", value)}
            >
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mt-6">Email Templates</h3>
          <p className="text-sm text-muted-foreground">
            Configure the default email template style
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="emailTemplate">Default Email Template</Label>
          <Select
            value={settings.emailTemplateId}
            onValueChange={(value) => handleChange("emailTemplateId", value)}
          >
            <SelectTrigger id="emailTemplate">
              <SelectValue placeholder="Select email template" />
            </SelectTrigger>
            <SelectContent>
              {emailTemplates.map((template) => (
                <SelectItem key={template.value} value={template.value}>
                  {template.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsTab;
