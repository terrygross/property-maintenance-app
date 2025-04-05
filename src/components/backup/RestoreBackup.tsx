
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArchiveRestore, UploadCloud, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { importData } from "@/utils/backupUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const RestoreBackup: React.FC = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    try {
      const success = await importData(file);
      
      if (success) {
        toast({
          title: "Data restored successfully",
          description: "Your backup has been imported and your data restored."
        });
        
        // Refresh the page to reflect restored data
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Restore failed",
        description: "There was an error restoring your backup.",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Restoring from a backup will completely replace all current data. This action cannot be undone.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader>
          <CardTitle>Restore from Backup</CardTitle>
          <CardDescription>
            Restore your data from a previous backup file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Select a backup file to restore your system data. All current data will be replaced with the data from the backup file.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={handleImportClick}
              disabled={isImporting}
              className="w-full md:w-auto"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              {isImporting ? "Restoring..." : "Select Backup File"}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".bak,.json"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <ArchiveRestore className="h-3 w-3 mr-1" /> 
            Supports backups created by this system only
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestoreBackup;
