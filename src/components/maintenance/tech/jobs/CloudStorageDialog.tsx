
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CloudRain, Download, UploadCloud, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Job } from "./JobCardTypes";
import { exportJobsToCloud } from "./utils/exportUtils";

interface CloudStorageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobs: Job[];
}

const CloudStorageDialog: React.FC<CloudStorageDialogProps> = ({
  open,
  onOpenChange,
  jobs
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string>("google");
  const [autoBackup, setAutoBackup] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  
  const handleBackupToCloud = async () => {
    if (jobs.length === 0) {
      toast({
        title: "No jobs to backup",
        description: "You don't have any completed jobs to backup.",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would actually upload to the chosen provider
      const result = await exportJobsToCloud(jobs, selectedProvider);
      
      if (result.success) {
        toast({
          title: "Jobs backed up successfully",
          description: `${jobs.length} jobs were backed up to ${getProviderName(selectedProvider)}`,
        });
        onOpenChange(false);
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      toast({
        title: "Backup failed",
        description: error instanceof Error ? error.message : "Cloud backup failed",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const getProviderName = (provider: string) => {
    switch (provider) {
      case "google": return "Google Drive";
      case "dropbox": return "Dropbox";
      case "icloud": return "iCloud";
      default: return provider;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cloud Storage Backup</DialogTitle>
          <DialogDescription>
            Backup your completed jobs to cloud storage for safekeeping
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Choose a cloud provider</h4>
            <RadioGroup 
              value={selectedProvider} 
              onValueChange={setSelectedProvider}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="google" id="google" />
                <Label htmlFor="google" className="flex-1">Google Drive</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="dropbox" id="dropbox" />
                <Label htmlFor="dropbox" className="flex-1">Dropbox</Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="icloud" id="icloud" />
                <Label htmlFor="icloud" className="flex-1">iCloud</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup">Auto Backup</Label>
              <p className="text-xs text-muted-foreground">
                Automatically backup new completed jobs
              </p>
            </div>
            <Switch
              id="auto-backup"
              checked={autoBackup}
              onCheckedChange={setAutoBackup}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBackupToCloud}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Backing up...
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4 mr-2" />
                Backup Now
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CloudStorageDialog;
