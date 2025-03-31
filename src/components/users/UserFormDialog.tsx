
import { User } from "@/types/user";
import UserForm from "@/components/UserForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
  defaultRole?: User['role'];
}

const UserFormDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedUser, 
  onSave, 
  onCancel,
  defaultRole
}: UserFormDialogProps) => {
  const isDesktop = !useIsMobile();

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogHeader>
          <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>
        <DialogContent className="overflow-y-auto max-h-[85vh]">
          <UserForm
            user={selectedUser}
            onSave={onSave}
            onCancel={onCancel}
            defaultRole={defaultRole}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerHeader>
        <DrawerTitle>{selectedUser ? "Edit User" : "Add New User"}</DrawerTitle>
      </DrawerHeader>
      <DrawerContent className="overflow-y-auto">
        <div className="px-4 pb-4">
          <UserForm
            user={selectedUser}
            onSave={onSave}
            onCancel={onCancel}
            defaultRole={defaultRole}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserFormDialog;
