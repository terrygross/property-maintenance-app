
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ui/dialog-components";
import { supabase, reporterJobsTable } from "@/integrations/supabase/client";

interface ClearStorageButtonProps {
  onClear?: () => void;
}

const ClearStorageButton = ({ onClear }: ClearStorageButtonProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleClearStorage = async () => {
    setIsClearing(true);
    try {
      // Clear unassigned jobs in Supabase
      const { error } = await reporterJobsTable()
        .delete()
        .eq('status', 'unassigned');
      
      if (error) throw error;
      
      // Also clear localStorage for backward compatibility
      localStorage.removeItem('reporterJobs');
      localStorage.removeItem('jobs');
      localStorage.removeItem('highPriorityJobs');
      
      // Dispatch events to update the UI
      document.dispatchEvent(new Event('jobsUpdated'));
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Storage cleared",
        description: "All unassigned job data has been successfully cleared.",
      });
      
      // Execute any additional reset logic from parent component
      if (onClear) {
        onClear();
      }
      
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Error clearing storage:", error);
      toast({
        title: "Error clearing storage",
        description: "There was a problem clearing the job data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowConfirmDialog(true)} 
        className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
        disabled={isClearing}
      >
        <Trash2 className="h-4 w-4" />
        {isClearing ? "Clearing..." : "Clear Storage"}
      </Button>
      
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Clear Job Storage"
        description="This will permanently delete ALL unassigned job data. This action cannot be undone."
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
