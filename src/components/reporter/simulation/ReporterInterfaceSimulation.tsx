
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReporterStation from "../ReporterStation";
import { useAppState } from "@/context/AppStateContext";

const ReporterInterfaceSimulation = () => {
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [stations, setStations] = useState<any[]>([]);
  
  // Load stations from localStorage
  useEffect(() => {
    const loadStations = () => {
      try {
        const savedStations = localStorage.getItem('reporterStations');
        if (savedStations) {
          const parsedStations = JSON.parse(savedStations);
          setStations(parsedStations);
          
          // If we have stations, select the first one by default
          if (parsedStations.length > 0) {
            setSelectedStation(parsedStations[0].stationId);
          }
        }
      } catch (error) {
        console.error("Error loading stations:", error);
        setStations([]);
      }
    };
    
    loadStations();
  }, []);

  // Handle station change
  const handleStationChange = (value: string) => {
    setSelectedStation(value);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-sm text-center text-muted-foreground mb-4">
          This is a simulation of the reporter interface as seen on a tablet or mobile device
        </p>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="station-select">Select Reporter Station</Label>
            {stations.length === 0 && (
              <span className="text-xs text-red-500">
                No stations available. Please create a station first.
              </span>
            )}
          </div>
          <Select
            value={selectedStation}
            onValueChange={handleStationChange}
            disabled={stations.length === 0}
          >
            <SelectTrigger id="station-select" className="w-full mt-1">
              <SelectValue placeholder="Select a station" />
            </SelectTrigger>
            <SelectContent>
              {stations.map((station) => (
                <SelectItem key={station.id} value={station.stationId}>
                  {station.stationId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedStation ? (
          <div className="max-w-md mx-auto bg-gray-50 rounded-lg overflow-hidden shadow border border-gray-200">
            {/* Mock device frame */}
            <div className="h-4 bg-gray-200 flex items-center justify-center rounded-t-lg">
              <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="p-4">
              <ReporterStation stationId={selectedStation} />
            </div>
            
            {/* Mock device home button */}
            <div className="h-6 bg-gray-200 flex items-center justify-center rounded-b-lg">
              <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 flex flex-col items-center justify-center">
              <p className="text-center text-muted-foreground">
                {stations.length > 0 
                  ? "Please select a station to view its interface" 
                  : "No reporter stations available. Please create a station first."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReporterInterfaceSimulation;
