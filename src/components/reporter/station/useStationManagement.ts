
import { useState, useEffect } from "react";
import { ReporterStation } from "./types";
import { StationFormValues } from "./StationForm";
import { useAppState } from "@/context/AppStateContext";
import { useToast } from "@/hooks/use-toast";

// LocalStorage key
const STORAGE_KEY = 'reporterStations';

export const useStationManagement = () => {
  const { properties } = useAppState();
  const { toast } = useToast();
  
  // Load stations from localStorage
  const [stations, setStations] = useState<ReporterStation[]>(() => {
    const savedStations = localStorage.getItem(STORAGE_KEY);
    if (savedStations) {
      try {
        // Parse saved stations
        const parsed = JSON.parse(savedStations);
        
        // Check if properties are loaded
        if (properties && properties.length > 0) {
          // Validate that property IDs still exist in the current properties
          const validStations = parsed.map((station: ReporterStation) => {
            // If the property doesn't exist, assign the first available property
            if (!properties.some(p => p.id === station.propertyId) && properties.length > 0) {
              console.log(`Station ${station.stationId} had invalid property ID ${station.propertyId}, assigning to ${properties[0].id}`);
              return {
                ...station,
                propertyId: properties[0].id
              };
            }
            return station;
          });
          
          // Save corrected stations back to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(validStations));
          return validStations;
        }
        
        return parsed;
      } catch (error) {
        console.error("Error parsing saved stations:", error);
        return [];
      }
    }
    return [];
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<ReporterStation | null>(null);

  // Save stations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stations));
  }, [stations]);

  // Watch for property changes to ensure stations reference valid properties
  useEffect(() => {
    if (properties.length > 0 && stations.length > 0) {
      // Check if any stations reference non-existent properties
      const updatedStations = stations.map(station => {
        if (!properties.some(p => p.id === station.propertyId)) {
          // If property doesn't exist, assign to first available property
          console.log(`Updating station ${station.stationId} to use property ${properties[0].id}`);
          return {
            ...station,
            propertyId: properties[0].id
          };
        }
        return station;
      });
      
      // If we updated any stations, save the changes
      const hasChanges = JSON.stringify(updatedStations) !== JSON.stringify(stations);
      if (hasChanges) {
        setStations(updatedStations);
        toast({
          title: "Station Data Updated",
          description: "Some stations were updated to reference valid properties.",
          variant: "destructive"
        });
        
        // Also update the localStorage directly to ensure it's in sync
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStations));
      }
    }
  }, [properties, stations, toast]);

  const handleOpenDialog = (station?: ReporterStation) => {
    if (station) {
      setSelectedStation(station);
    } else {
      setSelectedStation(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (data: StationFormValues) => {
    // Validate that the propertyId exists in the current properties
    const propertyExists = properties.some(p => p.id === data.propertyId);
    
    if (!propertyExists && properties.length > 0) {
      // If the selected property doesn't exist but we have properties, assign to the first one
      const updatedData = {
        ...data,
        propertyId: properties[0].id
      };
      
      toast({
        title: "Property Reassigned",
        description: "The selected property was invalid. Assigned to a valid property instead.",
        variant: "destructive"
      });
      
      if (selectedStation) {
        // Update existing station
        const updatedStations = stations.map((station) =>
          station.id === selectedStation.id
            ? {
                ...station,
                stationId: updatedData.stationId,
                companyName: updatedData.companyName,
                propertyId: updatedData.propertyId,
                password: updatedData.password || station.password,
              }
            : station
        );
        setStations(updatedStations);
        toast({
          title: "Station Updated",
          description: `Reporter station ${updatedData.stationId} has been updated.`
        });
      } else {
        // Add new station
        const newStation: ReporterStation = {
          id: String(Date.now()),
          stationId: updatedData.stationId,
          companyName: updatedData.companyName,
          propertyId: updatedData.propertyId,
          password: updatedData.password,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setStations([...stations, newStation]);
        toast({
          title: "Station Created",
          description: `New reporter station ${updatedData.stationId} has been created.`
        });
      }
    } else if (!propertyExists) {
      toast({
        title: "Invalid Property",
        description: "The selected property does not exist and no alternative properties are available.",
        variant: "destructive"
      });
      return;
    } else {
      if (selectedStation) {
        // Update existing station
        const updatedStations = stations.map((station) =>
          station.id === selectedStation.id
            ? {
                ...station,
                stationId: data.stationId,
                companyName: data.companyName,
                propertyId: data.propertyId,
                password: data.password || station.password,
              }
            : station
        );
        setStations(updatedStations);
        toast({
          title: "Station Updated",
          description: `Reporter station ${data.stationId} has been updated.`
        });
      } else {
        // Add new station
        const newStation: ReporterStation = {
          id: String(Date.now()),
          stationId: data.stationId,
          companyName: data.companyName,
          propertyId: data.propertyId,
          password: data.password,
          createdAt: new Date().toISOString().split("T")[0],
        };
        setStations([...stations, newStation]);
        toast({
          title: "Station Created",
          description: `New reporter station ${data.stationId} has been created.`
        });
      }
    }
    
    handleCloseDialog();
  };

  const handleDeleteStation = (stationId: string) => {
    setStations(stations.filter((station) => station.id !== stationId));
    toast({
      title: "Station Deleted",
      description: "Reporter station has been deleted."
    });
  };

  return {
    stations,
    isDialogOpen,
    selectedStation,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDeleteStation
  };
};
