
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CloudUpload, Archive, ArchiveRestore, Settings, Database } from "lucide-react";
import BackupSettings from "@/components/backup/BackupSettings";
import CloudProviders from "@/components/backup/CloudProviders";
import ManualBackup from "@/components/backup/ManualBackup";
import RestoreBackup from "@/components/backup/RestoreBackup";
import { useToast } from "@/hooks/use-toast";

const BackupRestore = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const { toast } = useToast();
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(
    localStorage.getItem("lastBackupDate")
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Backup & Restore</h1>
          <p className="text-muted-foreground">
            Securely back up your company data to cloud storage
          </p>
        </div>
        {lastBackupDate && (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Archive className="w-3 h-3 mr-1" />
            Last backup: {new Date(lastBackupDate).toLocaleDateString()}
          </Badge>
        )}
      </div>

      <Tabs
        defaultValue="manual"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="manual">
            <Archive className="w-4 h-4 mr-2" />
            Manual Backup
          </TabsTrigger>
          <TabsTrigger value="restore">
            <ArchiveRestore className="w-4 h-4 mr-2" />
            Restore Data
          </TabsTrigger>
          <TabsTrigger value="cloud">
            <CloudUpload className="w-4 h-4 mr-2" />
            Cloud Storage
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <ManualBackup setLastBackupDate={setLastBackupDate} />
        </TabsContent>

        <TabsContent value="restore" className="space-y-4">
          <RestoreBackup />
        </TabsContent>

        <TabsContent value="cloud" className="space-y-4">
          <CloudProviders setLastBackupDate={setLastBackupDate} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <BackupSettings />
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-500" />
            Data Security Information
          </CardTitle>
          <CardDescription>
            Important information about your data backups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Local Backups:</strong> Data is exported as an encrypted JSON file that can be stored on your device.
            </p>
            <p>
              <strong>Cloud Backups:</strong> When using cloud providers, your data is encrypted before being sent to the cloud storage.
            </p>
            <p>
              <strong>Data Ownership:</strong> You maintain full ownership of your data. We do not store your backups on our servers.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/20 text-xs text-muted-foreground">
          We recommend backing up your data regularly and keeping multiple backup versions.
        </CardFooter>
      </Card>
    </div>
  );
};

export default BackupRestore;
