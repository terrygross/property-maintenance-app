
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

  // Reset form when the selected station changes
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

  const handleFormChange = (name: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
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
          <Button onClick={handleSubmit}>
            {selectedStation ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StationDialog;
