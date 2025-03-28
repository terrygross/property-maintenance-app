
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ServiceProvider } from "@/hooks/useServiceProviders";

interface ServiceProviderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentProvider: ServiceProvider | null;
  setCurrentProvider: (provider: ServiceProvider) => void;
  onSave: () => void;
}

const ServiceProviderDialog = ({ 
  isOpen, 
  onOpenChange, 
  currentProvider, 
  setCurrentProvider, 
  onSave 
}: ServiceProviderDialogProps) => {
  if (!currentProvider) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentProvider?.id ? "Edit Provider" : "Add Provider"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={currentProvider?.name || ""}
              onChange={(e) =>
                setCurrentProvider({ ...currentProvider, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Person</Label>
            <Input
              id="contact"
              value={currentProvider?.contact || ""}
              onChange={(e) =>
                setCurrentProvider({
                  ...currentProvider,
                  contact: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={currentProvider?.phone || ""}
              onChange={(e) =>
                setCurrentProvider({
                  ...currentProvider,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={currentProvider?.email || ""}
              onChange={(e) =>
                setCurrentProvider({
                  ...currentProvider,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceProviderDialog;
