
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StandardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
  footer?: React.ReactNode;
}

export const StandardDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = "sm:max-w-[425px]",
  footer
}: StandardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(maxWidth, "max-h-[90vh] overflow-y-auto")}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  icon?: LucideIcon;
  iconClassName?: string;
  maxWidth?: string;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  icon: Icon,
  iconClassName,
  maxWidth = "sm:max-w-[425px]"
}: ConfirmDialogProps) => {
  
  const handleCancel = () => {
    onOpenChange(false);
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  const footer = (
    <>
      <Button variant="outline" onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button variant={confirmVariant} onClick={handleConfirm}>
        {confirmText}
      </Button>
    </>
  );

  return (
    <StandardDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      maxWidth={maxWidth}
      footer={footer}
    >
      {Icon && (
        <div className="flex justify-center my-6">
          <Icon className={cn("h-16 w-16", iconClassName)} />
        </div>
      )}
    </StandardDialog>
  );
};
