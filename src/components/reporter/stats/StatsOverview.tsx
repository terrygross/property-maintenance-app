
import { Clipboard, UserCog } from "lucide-react";
import StatsCard from "./StatsCard";

const StatsOverview = () => {
  return (
    <div className="flex items-start">
      <div className="grid gap-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatsCard
            title="Total Reporter Stations"
            value={2}
            description="Basic plan limit: 2 stations"
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
