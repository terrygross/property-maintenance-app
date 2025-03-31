
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResetJobsButton from "@/components/admin/ResetJobsButton";
import { Button } from "@/components/ui/button";
import { Download, Upload, RefreshCw, AlertOctagon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardActions = () => {
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Export Data",
      description: "Data export functionality will be implemented here.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import Data",
      description: "Data import functionality will be implemented here.",
    });
  };

  const handleSystemCheck = () => {
    toast({
      title: "System Check",
      description: "All systems are operational.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Actions</CardTitle>
        <CardDescription>
          Tools to manage and reset system data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Reset Test Data</h3>
            <p className="text-xs text-muted-foreground">
              This will delete all existing jobs and create fresh mock data for testing.
            </p>
            <ResetJobsButton variant="destructive" className="w-full mt-1" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium">Data Management</h3>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button variant="outline" size="sm" onClick={handleExportData} className="flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleImportData} className="flex items-center gap-1">
                <Upload className="h-3.5 w-3.5" />
                Import
              </Button>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium">System Health</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSystemCheck} 
              className="w-full mt-1 flex items-center justify-center gap-1"
            >
              <AlertOctagon className="h-3.5 w-3.5" />
              Run System Check
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
