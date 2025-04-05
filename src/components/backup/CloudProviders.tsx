
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudUpload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { exportData } from "@/utils/backupUtils";

interface CloudProvidersProps {
  setLastBackupDate: (date: string) => void;
}

const CloudProviders: React.FC<CloudProvidersProps> = ({ setLastBackupDate }) => {
  const { toast } = useToast();
  const [activeProvider, setActiveProvider] = useState("googledrive");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (provider: string) => {
    setIsConnecting(true);
    
    // Simulating authentication flow
    setTimeout(() => {
      toast({
        title: "Coming Soon",
        description: `${getProviderName(provider)} integration will be available soon.`
      });
      setIsConnecting(false);
    }, 1000);
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "googledrive": return "Google Drive";
      case "onedrive": return "Microsoft OneDrive";
      case "dropbox": return "Dropbox";
      default: return provider;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cloud Storage Integration</CardTitle>
        <CardDescription>
          Connect to cloud storage providers for automatic backups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="googledrive"
          value={activeProvider}
          onValueChange={setActiveProvider}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="googledrive">Google Drive</TabsTrigger>
            <TabsTrigger value="onedrive">Microsoft OneDrive</TabsTrigger>
            <TabsTrigger value="dropbox">Dropbox</TabsTrigger>
          </TabsList>

          <TabsContent value="googledrive" className="space-y-4">
            <div className="flex flex-col p-4 border rounded-md bg-muted/20">
              <h3 className="font-medium mb-2">Google Drive Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Back up your data directly to your Google Drive account. Your data will be encrypted before being uploaded.
              </p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => handleConnect("googledrive")}
                  disabled={isConnecting}
                >
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Connect to Google Drive
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="onedrive" className="space-y-4">
            <div className="flex flex-col p-4 border rounded-md bg-muted/20">
              <h3 className="font-medium mb-2">Microsoft OneDrive Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Back up your data directly to your OneDrive account. Your data will be encrypted before being uploaded.
              </p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => handleConnect("onedrive")}
                  disabled={isConnecting}
                >
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Connect to OneDrive
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dropbox" className="space-y-4">
            <div className="flex flex-col p-4 border rounded-md bg-muted/20">
              <h3 className="font-medium mb-2">Dropbox Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Back up your data directly to your Dropbox account. Your data will be encrypted before being uploaded.
              </p>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => handleConnect("dropbox")}
                  disabled={isConnecting}
                >
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Connect to Dropbox
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CloudProviders;
