
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";
import ReporterStationHeader from "./ReporterStationHeader";
import ReporterForm from "./ReporterForm";

interface ReporterStationProps {
  stationId: string;
}

const ReporterStation = ({ stationId }: ReporterStationProps) => {
  const { properties } = useAppState();
  
  // State to store the station's property ID
  const [stationProperty, setStationProperty] = useState("");
  
  // Find the property ID for this station from localStorage
  useEffect(() => {
    try {
      const savedStations = localStorage.getItem('reporterStations');
      if (savedStations) {
        const stations = JSON.parse(savedStations);
        const station = stations.find((s: any) => s.stationId === stationId);
        if (station) {
          setStationProperty(station.propertyId);
        } else {
          // Fallback if station not found
          setStationProperty(properties.length > 0 ? properties[0].id : "");
        }
      }
    } catch (error) {
      console.error("Error finding station property:", error);
      // Fallback if error occurs
      setStationProperty(properties.length > 0 ? properties[0].id : "");
    }
  }, [stationId, properties]);

  // Get the current property name for display
  const propertyName = properties.find(p => p.id === stationProperty)?.name || "Unknown Property";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <ReporterStationHeader stationId={stationId} propertyName={propertyName} />
      </CardHeader>
      <CardContent>
        <ReporterForm 
          stationId={stationId} 
          stationProperty={stationProperty} 
          propertyName={propertyName} 
        />
      </CardContent>
    </Card>
  );
};

export default ReporterStation;
