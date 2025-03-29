
import { useState, useEffect } from "react";
import { ReporterStation } from "./types";
import { StationFormValues } from "./StationForm";
import { useAppState } from "@/context/AppStateContext";
import { useToast } from "@/hooks/use-toast";

// Mock data for reporter stations
const mockStations: ReporterStation[] = [
  {
    id: "1",
    stationId: "STATION-001",
    companyName: "Building Management Co",
    propertyId: "1",
    password: "******",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    stationId: "STATION-002",
    companyName: "Property Services Ltd",
    propertyId: "2",
    password: "******",
    createdAt: "2023-07-22",
  },
];

export const useStationManagement = () => {
  const [stations, setStations] = useState<ReporterStation[]>(() => {
    const savedStations = localStorage.getItem('reporterStations');
    return savedStations ? JSON.parse(savedStations) : mockStations;
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<ReporterStation | null>(null);
  const { properties } = useAppState();
  const { toast } = useToast();

  // Save stations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reporterStations', JSON.stringify(stations));
  }, [stations]);

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
    
    if (!propertyExists) {
      toast({
        title: "Invalid Property",
        description: "The selected property does not exist.",
        variant: "destructive"
      });
      return;
    }

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
