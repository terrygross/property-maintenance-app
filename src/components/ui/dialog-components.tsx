
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface StandardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export const StandardDialog = ({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconClassName = "text-primary",
  children,
  footer,
  maxWidth = "sm:max-w-[500px]"
}: StandardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={maxWidth}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {Icon && <Icon className={`h-5 w-5 ${iconClassName}`} />}
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  maxWidth?: string;
  destructive?: boolean;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconClassName = "text-primary",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  maxWidth = "sm:max-w-[425px]",
  destructive = false
}: ConfirmDialogProps) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };
  
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };
  
  return (
    <StandardDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      icon={Icon}
      iconClassName={destructive ? "text-destructive" : iconClassName}
      maxWidth={maxWidth}
      footer={
        <>
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button 
            onClick={handleConfirm}
            variant={destructive ? "destructive" : "default"}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      {/* Dialog can have additional content here */}
    </StandardDialog>
  );
};
