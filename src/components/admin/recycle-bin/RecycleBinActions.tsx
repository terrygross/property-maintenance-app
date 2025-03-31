
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface RecycleBinActionsProps {
  onEmptyBin: () => void;
}

const RecycleBinActions = ({ onEmptyBin }: RecycleBinActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={onEmptyBin}
        className="flex items-center gap-1"
      >
        <Trash2 className="h-4 w-4" />
        <span>Empty Recycle Bin</span>
      </Button>
    </div>
  );
};

export default RecycleBinActions;
