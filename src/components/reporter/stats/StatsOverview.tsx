
import React from "react";
import { useAppState } from "@/context/AppStateContext";
import StatsCard from "./StatsCard";
import { Users, AlertTriangle, History, CheckCircle } from "lucide-react";

const StatsOverview = () => {
  const { reporterStations, additionalStations } = useAppState();
  
  const stats = [
    {
      title: "Reporter Stations",
      value: reporterStations.toString(),
      description: `Base (2) + (${additionalStations}) Additional`,
      icon: Users,
      color: "blue"
    },
    {
      title: "Unprocessed Reports",
      value: "5",
      description: "Awaiting review",
      icon: AlertTriangle,
      color: "amber"
    },
    {
      title: "Recently Assigned",
      value: "12",
      description: "Last 7 days",
      icon: History,
      color: "indigo"
    },
    {
      title: "Completed Jobs",
      value: "28",
      description: "Last 30 days",
      icon: CheckCircle,
      color: "green"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsOverview;
