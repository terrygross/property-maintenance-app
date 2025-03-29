
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StationForm, { StationFormValues } from "./StationForm";
import { ReporterStation } from "./types";

interface StationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StationFormValues) => void;
  selectedStation: ReporterStation | null;
}

const StationDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedStation 
}: StationDialogProps) => {
  const isEditing = !!selectedStation;

  const defaultValues: StationFormValues = selectedStation ? {
    stationId: selectedStation.stationId,
    companyName: selectedStation.companyName,
    propertyId: selectedStation.propertyId,
    password: "", // Leave blank for editing
  } : {
    stationId: "",
    companyName: "",
    propertyId: "",
    password: "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Edit Reporter Station" : "Add Reporter Station"}
        </DialogTitle>
      </DialogHeader>
      <DialogContent>
        <StationForm 
          onSubmit={onSubmit}
          onCancel={onClose}
          defaultValues={defaultValues}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StationDialog;
