
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppState } from "@/context/AppStateContext";
import ReporterStationHeader from "./ReporterStationHeader";
import ReporterForm from "./ReporterForm";
import { useToast } from "@/hooks/use-toast";

interface ReporterStationProps {
  stationId: string;
}

const ReporterStation = ({ stationId }: ReporterStationProps) => {
  const { properties } = useAppState();
  const { toast } = useToast();
  
  // State to store the station's property ID
  const [stationProperty, setStationProperty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the property ID for this station from localStorage
  useEffect(() => {
    try {
      setIsLoading(true);
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
            if (properties.length > 0) {
              setStationProperty(properties[0].id);
              toast({
                title: "Property Changed",
                description: "The associated property was not found. Using default property instead.",
                variant: "warning"
              });
            } else {
              setStationProperty("");
              toast({
                title: "No Properties Available",
                description: "No properties are available for this station.",
                variant: "destructive"
              });
            }
          }
        } else {
          console.error(`Station with ID ${stationId} not found`);
          // Fallback if station not found
          if (properties.length > 0) {
            setStationProperty(properties[0].id);
            toast({
              title: "Station Not Found",
              description: "Using default property settings.",
              variant: "warning"
            });
          } else {
            setStationProperty("");
          }
        }
      } else {
        console.error("No stations found in localStorage");
        // Fallback if no stations are found
        if (properties.length > 0) {
          setStationProperty(properties[0].id);
        } else {
          setStationProperty("");
        }
      }
    } catch (error) {
      console.error("Error finding station property:", error);
      // Fallback if error occurs
      if (properties.length > 0) {
        setStationProperty(properties[0].id);
      } else {
        setStationProperty("");
      }
      toast({
        title: "Error Loading Station",
        description: "There was a problem loading the station configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [stationId, properties, toast]);

  // Get the current property name for display
  const currentProperty = properties.find(p => p.id === stationProperty);
  const propertyName = currentProperty ? currentProperty.name : "Unknown Property";

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <ReporterStationHeader stationId={stationId} propertyName={propertyName} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground" aria-live="polite">
            <p>Loading station configuration...</p>
          </div>
        ) : stationProperty ? (
          <ReporterForm 
            stationId={stationId} 
            stationProperty={stationProperty} 
            propertyName={propertyName} 
          />
        ) : (
          <div className="py-8 text-center text-muted-foreground" aria-live="polite">
            <p>No properties available for this station. Please add a property first.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReporterStation;
