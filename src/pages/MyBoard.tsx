
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import ComplianceCalendar from "@/components/compliance/ComplianceCalendar";
import { ComplianceProvider } from "@/context/ComplianceContext";

const MyBoard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="container mx-auto p-4 md:p-6">
        <ComplianceProvider>
          <ComplianceCalendar />
        </ComplianceProvider>
      </div>
    </div>
  );
};

export default MyBoard;
