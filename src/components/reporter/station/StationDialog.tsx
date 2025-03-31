
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StationForm from "./StationForm";
import { ReporterStation } from "./types";
import { StationFormValues } from "./StationForm";
import { useAppState } from "@/context/AppStateContext";

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
  selectedStation,
}: StationDialogProps) => {
  const { properties } = useAppState();
  const [formValues, setFormValues] = useState<StationFormValues>({
    stationId: "",
    companyName: "",
    propertyId: "",
    password: "",
  });

  // Reset form when the selected station changes or when properties change
  useEffect(() => {
    if (selectedStation) {
      setFormValues({
        stationId: selectedStation.stationId,
        companyName: selectedStation.companyName,
        propertyId: selectedStation.propertyId,
        password: "",
      });
    } else {
      setFormValues({
        stationId: "",
        companyName: "",
        propertyId: properties.length > 0 ? properties[0].id : "",
        password: "",
      });
    }
  }, [selectedStation, properties]);

  const handleFormChange = (values: StationFormValues) => {
    setFormValues(values);
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  // Handle the case when there are no properties
  if (properties.length === 0 && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No Properties Available</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              You need to create at least one property before you can add a reporter station.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedStation ? "Edit Reporter Station" : "Add Reporter Station"}
          </DialogTitle>
        </DialogHeader>
        <StationForm
          defaultValues={formValues}
          onChange={handleFormChange}
          properties={properties}
          isEditing={!!selectedStation}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={properties.length === 0}>
            {selectedStation ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StationDialog;
