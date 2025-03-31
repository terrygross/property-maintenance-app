
import { Clipboard, UserCog } from "lucide-react";
import StatsCard from "./StatsCard";
import { useAppState } from "@/context/AppStateContext";
import { useState, useEffect } from "react";

const StatsOverview = () => {
  const { reporterStations, additionalStations } = useAppState();
  const [stationCount, setStationCount] = useState(0);

  // Load stations from localStorage to get the actual count
  useEffect(() => {
    const STORAGE_KEY = 'reporterStations';
    try {
      const savedStations = localStorage.getItem(STORAGE_KEY);
      if (savedStations) {
        const stations = JSON.parse(savedStations);
        setStationCount(stations.length);
      }
    } catch (error) {
      console.error("Error loading stations from localStorage:", error);
    }
  }, []);

  // Use the higher number between actual stations and subscription limit
  const displayCount = Math.max(stationCount, reporterStations);
  
  // Calculate description text to show base plan and additional stations
  const description = `Basic plan (2) + ${additionalStations} additional station${additionalStations !== 1 ? 's' : ''}`;

  return (
    <div className="flex items-start">
      <div className="grid gap-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsCard
            title="Total Reporter Stations"
            value={displayCount}
            description={description}
            icon={Clipboard}
          />
          <StatsCard
            title="Reporter Accounts"
            value={2}
            description="Active reporter user accounts"
            icon={UserCog}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
