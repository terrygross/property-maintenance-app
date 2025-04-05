
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
          console.log(`Found station with ID ${stationId} and property ID: ${station.propertyId}`);
          
          // Check if the property ID is valid (exists in the properties list)
          const propertyExists = properties.some(p => p.id === station.propertyId);
          if (propertyExists) {
            setStationProperty(station.propertyId);
          } else {
            console.warn(`Property ID ${station.propertyId} not found in properties list. Using first available property.`);
            // Fallback to first property if the property ID doesn't exist
            setStationProperty(properties.length > 0 ? properties[0].id : "");
          }
        } else {
          console.error(`Station with ID ${stationId} not found`);
          // Fallback if station not found
          setStationProperty(properties.length > 0 ? properties[0].id : "");
        }
      } else {
        console.error("No stations found in localStorage");
        // Fallback if no stations are found
        setStationProperty(properties.length > 0 ? properties[0].id : "");
      }
    } catch (error) {
      console.error("Error finding station property:", error);
      // Fallback if error occurs
      setStationProperty(properties.length > 0 ? properties[0].id : "");
    }
  }, [stationId, properties]);

  // Get the current property name for display
  const currentProperty = properties.find(p => p.id === stationProperty);
  const propertyName = currentProperty ? currentProperty.name : "Unknown Property";

  console.log("ReporterStation - Current property:", propertyName, "ID:", stationProperty);

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
