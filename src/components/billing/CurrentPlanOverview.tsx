
import { BadgeDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CurrentPlanOverviewProps {
  currentPlan: string;
  techCount: number;
  stationCount: number;
}

const CurrentPlanOverview = ({ currentPlan, techCount, stationCount }: CurrentPlanOverviewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-sm font-medium text-gray-500">Current Plan</div>
          <div className="text-2xl font-bold text-blue-700">{currentPlan}</div>
          <div className="text-sm text-gray-500 mt-1">£2,900/year</div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Maintenance Technicians</div>
          <div className="text-2xl font-bold">6 <span className="text-green-600 text-sm font-normal">+{techCount}</span></div>
          <div className="text-sm text-gray-500 mt-1">Base plan includes 6 techs</div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Reporting Stations</div>
          <div className="text-2xl font-bold">3 <span className="text-green-600 text-sm font-normal">+{stationCount}</span></div>
          <div className="text-sm text-gray-500 mt-1">Base plan includes 3 stations</div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-md font-medium">Billing Cycle</h3>
            <p className="text-sm text-gray-500">Your next payment is due on June 15, 2023</p>
          </div>
          <Badge>Active</Badge>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanOverview;
