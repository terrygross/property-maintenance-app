
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ui/dialog-components";

interface ClearStorageButtonProps {
  onClear?: () => void;
}

const ClearStorageButton = ({ onClear }: ClearStorageButtonProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { toast } = useToast();

  const handleClearStorage = () => {
    // Clear all job-related localStorage items
    localStorage.removeItem('reporterJobs');
    localStorage.removeItem('jobs');
    localStorage.removeItem('highPriorityJobs');
    
    // Dispatch storage event to notify other components
    window.dispatchEvent(new Event('storage'));
    document.dispatchEvent(new Event('jobsUpdated'));
    
    toast({
      title: "Storage cleared",
      description: "All job data has been successfully cleared from browser storage.",
    });
    
    // Execute any additional reset logic from parent component
    if (onClear) {
      onClear();
    }
    
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowConfirmDialog(true)} 
        className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
      >
        <Trash2 className="h-4 w-4" />
        Clear Storage
      </Button>
      
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Clear Job Storage"
        description="This will permanently delete ALL job data stored in this browser. This action cannot be undone."
        onConfirm={handleClearStorage}
        confirmText="Clear Storage"
        confirmVariant="destructive"
        icon={Trash2}
        iconClassName="text-red-500"
      />
    </>
  );
};

export default ClearStorageButton;
