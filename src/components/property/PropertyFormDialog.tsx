
import { Property } from "@/types/property";
import { useIsMobile } from "@/hooks/use-mobile";
import PropertyForm from "../PropertyForm";
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

interface PropertyFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProperty: Property | null;
  onSave: (property: Property) => void;
  onCancel: () => void;
}

const PropertyFormDialog = ({
  isOpen,
  onOpenChange,
  selectedProperty,
  onSave,
  onCancel,
}: PropertyFormDialogProps) => {
  const isDesktop = !useIsMobile();

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedProperty ? "Edit Property" : "Add Property"}
          </DialogTitle>
        </DialogHeader>
        <PropertyForm
          property={selectedProperty}
          onSave={onSave}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {selectedProperty ? "Edit Property" : "Add Property"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <PropertyForm
            property={selectedProperty}
            onSave={onSave}
            onCancel={onCancel}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PropertyFormDialog;
