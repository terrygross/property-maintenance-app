
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  itemName: string;
  isPermanent?: boolean;
}

const DeleteConfirmDialog = ({
  isOpen,
  onOpenChange,
  onConfirmDelete,
  itemName,
  isPermanent = false
}: DeleteConfirmDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            {isPermanent ? "Permanently Delete?" : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPermanent 
              ? `This will permanently delete "${itemName}". This action cannot be undone.`
              : `This will move "${itemName}" to the recycle bin. Items in the recycle bin will be permanently deleted after 30 days.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isPermanent ? "Permanently Delete" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
