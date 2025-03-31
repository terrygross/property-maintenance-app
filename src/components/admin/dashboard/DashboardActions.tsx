
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, RefreshCw } from "lucide-react";
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
          Tools to manage and import/export system data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
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
