
import React from "react";
import { FileText } from "lucide-react";

const SystemActionsInfo = () => {
  return (
    <p className="text-xs text-muted-foreground mt-2">
      <FileText className="h-3 w-3 inline mr-1" />
      Manage job data - export to CSV, import historical data, or clear browser storage
    </p>
  );
};

export default SystemActionsInfo;
