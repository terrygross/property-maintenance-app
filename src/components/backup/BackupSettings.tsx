
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Settings, Save } from "lucide-react";

const BackupSettings = () => {
  const { toast } = useToast();
  const [autoBackup, setAutoBackup] = useState(() => {
    return localStorage.getItem("autoBackupEnabled") === "true";
  });
  const [backupFrequency, setBackupFrequency] = useState(() => {
    return localStorage.getItem("backupFrequency") || "weekly";
  });
  const [backupRetention, setBackupRetention] = useState(() => {
    return localStorage.getItem("backupRetention") || "3";
  });
  const [isEncrypted, setIsEncrypted] = useState(() => {
    return localStorage.getItem("backupEncryption") !== "false"; // Default to true
  });

  const handleSaveSettings = () => {
    localStorage.setItem("autoBackupEnabled", autoBackup.toString());
    localStorage.setItem("backupFrequency", backupFrequency);
    localStorage.setItem("backupRetention", backupRetention);
    localStorage.setItem("backupEncryption", isEncrypted.toString());

    toast({
      title: "Settings saved",
      description: "Your backup settings have been saved."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Backup Settings
        </CardTitle>
        <CardDescription>
          Configure how your data backups work
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-backup" className="font-medium">Automatic Backups</Label>
            <p className="text-sm text-muted-foreground">
              Enable scheduled automatic backups to cloud storage
            </p>
          </div>
          <Switch
            id="auto-backup"
            checked={autoBackup}
            onCheckedChange={setAutoBackup}
          />
        </div>

        {autoBackup && (
          <div className="space-y-4 pl-0 md:pl-6 border-l-0 md:border-l pt-4">
            <div>
              <Label className="font-medium mb-2 block">Backup Frequency</Label>
              <RadioGroup value={backupFrequency} onValueChange={setBackupFrequency}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="font-medium mb-2 block">Backup Retention</Label>
              <RadioGroup value={backupRetention} onValueChange={setBackupRetention}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="3" id="retention-3" />
                  <Label htmlFor="retention-3">Keep last 3 backups</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="5" id="retention-5" />
                  <Label htmlFor="retention-5">Keep last 5 backups</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10" id="retention-10" />
                  <Label htmlFor="retention-10">Keep last 10 backups</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <Label htmlFor="encryption" className="font-medium">Encrypt Backups</Label>
            <p className="text-sm text-muted-foreground">
              Enable encryption for your backup files (recommended)
            </p>
          </div>
          <Switch
            id="encryption"
            checked={isEncrypted}
            onCheckedChange={setIsEncrypted}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupSettings;
