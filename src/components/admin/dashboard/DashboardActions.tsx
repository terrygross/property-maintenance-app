
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExportDataButton from "./ExportDataButton";
import ImportDataButton from "./ImportDataButton";
import SystemCheckButton from "./SystemCheckButton";
import ClearStorageButton from "@/components/admin/ClearStorageButton";

interface DashboardActionsProps {
  compact?: boolean;
}

const DashboardActions = ({ compact = false }: DashboardActionsProps) => {
  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">System Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-2">
          <div className="grid grid-cols-4 gap-1">
            <ExportDataButton size="xs" />
            <ImportDataButton size="xs" />
            <SystemCheckButton />
            <ClearStorageButton />
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
            <div className="grid grid-cols-3 gap-2 mt-1">
              <ExportDataButton />
              <ImportDataButton />
              <ClearStorageButton />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium">System Health</h3>
            <SystemCheckButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardActions;
