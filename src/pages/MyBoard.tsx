
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import ComplianceCalendar from "@/components/compliance/ComplianceCalendar";
import { ComplianceProvider } from "@/context/ComplianceContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatDrawer from "@/components/chat/ChatDrawer";
import { useAppState } from "@/context/AppStateContext";

const MyBoard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppState();
  const currentUserId = currentUser?.id || "4"; // Default to admin if no current user

  const handleBackToOverview = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToOverview}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Overview
          </Button>
        </div>
        <ComplianceProvider>
          <ComplianceCalendar />
        </ComplianceProvider>
      </div>
      <ChatDrawer currentUserId={currentUserId} />
    </div>
  );
};

export default MyBoard;
