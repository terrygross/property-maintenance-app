
import React from "react";
import { SecuritySettings } from "@/hooks/settings/useSystemSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface SecuritySettingsTabProps {
  settings: SecuritySettings;
  updateSettings: (values: Partial<SecuritySettings>) => void;
}

const SecuritySettingsTab = ({ settings, updateSettings }: SecuritySettingsTabProps) => {
  const handleBooleanChange = (field: keyof SecuritySettings, value: boolean) => {
    updateSettings({ [field]: value });
  };

  const handleNumberChange = (field: keyof SecuritySettings, value: number) => {
    updateSettings({ [field]: value });
  };

  const handleIpRangeChange = (index: number, value: string) => {
    const newRanges = [...settings.allowedIpRanges];
    newRanges[index] = value;
    updateSettings({ allowedIpRanges: newRanges });
  };

  const addIpRange = () => {
    updateSettings({
      allowedIpRanges: [...settings.allowedIpRanges, "0.0.0.0/0"]
    });
  };

  const removeIpRange = (index: number) => {
    const newRanges = settings.allowedIpRanges.filter((_, i) => i !== index);
    updateSettings({ allowedIpRanges: newRanges });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Password Policy</h3>
        <p className="text-sm text-muted-foreground">
          Configure password requirements for users
        </p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="passwordMinLength">Minimum Password Length: {settings.passwordMinLength}</Label>
            </div>
            <Slider
              id="passwordMinLength"
              min={6}
              max={16}
              step={1}
              value={[settings.passwordMinLength]}
              onValueChange={(value) => handleNumberChange("passwordMinLength", value[0])}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="passwordRequireUppercase"
              checked={settings.passwordRequireUppercase}
              onCheckedChange={(value) => handleBooleanChange("passwordRequireUppercase", value)}
            />
            <Label htmlFor="passwordRequireUppercase">Require Uppercase Letters</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="passwordRequireNumbers"
              checked={settings.passwordRequireNumbers}
              onCheckedChange={(value) => handleBooleanChange("passwordRequireNumbers", value)}
            />
            <Label htmlFor="passwordRequireNumbers">Require Numbers</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="passwordRequireSpecialChars"
              checked={settings.passwordRequireSpecialChars}
              onCheckedChange={(value) => handleBooleanChange("passwordRequireSpecialChars", value)}
            />
            <Label htmlFor="passwordRequireSpecialChars">Require Special Characters</Label>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="passwordExpiryDays">Password Expiry (Days): {settings.passwordExpiryDays}</Label>
            </div>
            <Slider
              id="passwordExpiryDays"
              min={0}
              max={365}
              step={30}
              value={[settings.passwordExpiryDays]}
              onValueChange={(value) => handleNumberChange("passwordExpiryDays", value[0])}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">Set to 0 for no expiry</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mt-6">Session Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure user session behavior
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="sessionTimeoutMinutes">Session Timeout (Minutes): {settings.sessionTimeoutMinutes}</Label>
            </div>
            <Slider
              id="sessionTimeoutMinutes"
              min={5}
              max={240}
              step={5}
              value={[settings.sessionTimeoutMinutes]}
              onValueChange={(value) => handleNumberChange("sessionTimeoutMinutes", value[0])}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="enforceMfa"
              checked={settings.enforceMfa}
              onCheckedChange={(value) => handleBooleanChange("enforceMfa", value)}
            />
            <Label htmlFor="enforceMfa">Enforce Multi-Factor Authentication</Label>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mt-6">IP Restrictions</h3>
          <p className="text-sm text-muted-foreground">
            Restrict access to specific IP ranges (CIDR notation)
          </p>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          {settings.allowedIpRanges.map((range, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={range}
                onChange={(e) => handleIpRangeChange(index, e.target.value)}
                placeholder="e.g., 192.168.1.0/24"
              />
              <button
                type="button"
                onClick={() => removeIpRange(index)}
                className="text-destructive hover:text-destructive/80"
                disabled={settings.allowedIpRanges.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addIpRange}
            className="text-primary hover:text-primary/80"
          >
            Add IP Range
          </button>
          
          <div className="pt-2">
            <Badge variant="secondary" className="mr-1">Note</Badge>
            <span className="text-xs text-muted-foreground">
              Use 0.0.0.0/0 to allow all IP addresses.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsTab;
