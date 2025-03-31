
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResetJobsButton from "@/components/admin/ResetJobsButton";
import { Button } from "@/components/ui/button";
import { Download, Upload, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardActionsProps {
  compact?: boolean;
}

const DashboardActions = ({ compact = false }: DashboardActionsProps) => {
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

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">System Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-2">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="h-3 w-3 text-yellow-600" />
              <p className="text-xs font-medium text-yellow-800">
                No jobs showing?
              </p>
            </div>
            <ResetJobsButton variant="destructive" className="w-full text-xs h-7 mb-1" />
          </div>
          
          <div className="grid grid-cols-3 gap-1">
            <Button variant="outline" size="sm" onClick={handleExportData} className="text-xs h-7 px-1">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleImportData} className="text-xs h-7 px-1">
              <Upload className="h-3 w-3 mr-1" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleSystemCheck} className="text-xs h-7 px-1">
              <RefreshCw className="h-3 w-3 mr-1" />
              Check
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
            <p className="text-xs text-muted-foreground mb-2">
              This will delete all existing jobs and create fresh mock data for testing.
            </p>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm font-medium text-yellow-800">
                  No jobs showing up?
                </p>
              </div>
              <p className="text-xs text-yellow-700 mb-3">
                Click the button below to generate new jobs, then visit the "Reported Jobs" tab.
              </p>
              <ResetJobsButton variant="destructive" className="w-full mb-2" />
            </div>
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
              <RefreshCw className="h-3.5 w-3.5" />
              Run System Check
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
