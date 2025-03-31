
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriorityDialogProps } from "./JobCardTypes";

const PriorityDialog = ({ 
  showPriorityDialog, 
  setShowPriorityDialog,
  selectedPriority,
  setSelectedPriority,
  handlePriorityChange 
}: PriorityDialogProps) => {
  return (
    <Dialog open={showPriorityDialog} onOpenChange={setShowPriorityDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Priority</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handlePriorityChange}>Update Priority</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriorityDialog;
