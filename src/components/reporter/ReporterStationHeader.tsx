
import React from "react";

interface ReporterStationHeaderProps {
  stationId: string;
  propertyName: string;
}

const ReporterStationHeader = ({ stationId, propertyName }: ReporterStationHeaderProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-1">Maintenance Request Station</h2>
      <p className="text-muted-foreground mb-2">
        Station ID: {stationId}
      </p>
      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-md">
        <p className="font-medium">Property: {propertyName}</p>
      </div>
    </div>
  );
};

export default ReporterStationHeader;
