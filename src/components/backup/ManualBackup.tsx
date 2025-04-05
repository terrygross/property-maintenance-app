
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportData } from "@/utils/backupUtils";

interface ManualBackupProps {
  setLastBackupDate: (date: string) => void;
}

const ManualBackup: React.FC<ManualBackupProps> = ({ setLastBackupDate }) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const success = await exportData();
      
      if (success) {
        const now = new Date().toISOString();
        localStorage.setItem("lastBackupDate", now);
        setLastBackupDate(now);
        
        toast({
          title: "Backup created successfully",
          description: "Your data has been exported as a file."
        });
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Backup failed",
        description: "There was an error creating your backup.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Backup</CardTitle>
        <CardDescription>
          Create a backup file of all your system data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This will create a backup file containing all your maintenance jobs, user data, property information, and settings.
          The backup file can be used to restore your data in the future.
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="w-full md:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Creating Backup..." : "Create Backup Now"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <div>Format: Encrypted JSON</div>
        <div className="flex items-center">
          <Archive className="h-3 w-3 mr-1" /> 
          Store in a secure location
        </div>
      </CardFooter>
    </Card>
  );
};

export default ManualBackup;
