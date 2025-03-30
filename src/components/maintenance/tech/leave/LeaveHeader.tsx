
import React from "react";
import { Button } from "@/components/ui/button";

interface LeaveHeaderProps {
  setOpenRequest: (open: boolean) => void;
}

const LeaveHeader = ({ setOpenRequest }: LeaveHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">My Leave Schedule</h2>
      <Button onClick={() => setOpenRequest(true)}>Request Leave</Button>
    </div>
  );
};

export default LeaveHeader;
