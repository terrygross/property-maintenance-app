
import React from "react";
import { CardTitle } from "@/components/ui/card";

interface ReporterStationHeaderProps {
  stationId: string;
  propertyName: string;
}

const ReporterStationHeader = ({ stationId, propertyName }: ReporterStationHeaderProps) => {
  return (
    <>
      <CardTitle className="text-2xl">Report Maintenance Issue</CardTitle>
      <div className="text-sm text-muted-foreground">
        <div>Station ID: {stationId}</div>
        <div>Property: {propertyName}</div>
      </div>
    </>
  );
};

export default ReporterStationHeader;
