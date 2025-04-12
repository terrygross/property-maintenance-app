
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
  variant?: "default" | "destructive" | "outline";
  size?: "default" | "sm" | "lg";
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isConfirming = false,
  variant = "default",
  size = "default",
}: ConfirmDialogProps) => {
  // Map size to max-width class
  const sizeClasses = {
    sm: "sm:max-w-[425px]",
    default: "sm:max-w-[500px]",
    lg: "sm:max-w-[640px]",
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (isConfirming && !newOpen) return;
      onOpenChange(newOpen);
    }}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant} 
            onClick={onConfirm}
            disabled={isConfirming}
          >
            {isConfirming ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
