
import React from "react";
import { ConfirmDialog } from "@/components/ui/dialog-components";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName: string;
  itemType?: string;
}

const DeleteConfirmationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title = "Confirm Deletion",
  description,
  itemName,
  itemType = "item"
}: DeleteConfirmationDialogProps) => {
  const defaultDescription = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
  
  return (
    <ConfirmDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      description={description || defaultDescription}
      onConfirm={onConfirm}
      confirmText="Delete"
      cancelText="Cancel"
      confirmVariant="destructive"
      icon={Trash2}
      iconClassName="text-destructive"
    />
  );
};

export default DeleteConfirmationDialog;
