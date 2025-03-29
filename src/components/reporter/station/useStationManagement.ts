
import { useState } from "react";
import { ReporterStation } from "./types";
import { StationFormValues } from "./StationForm";

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
  const [stations, setStations] = useState<ReporterStation[]>(mockStations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<ReporterStation | null>(null);

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
    }
    
    handleCloseDialog();
  };

  const handleDeleteStation = (stationId: string) => {
    setStations(stations.filter((station) => station.id !== stationId));
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
