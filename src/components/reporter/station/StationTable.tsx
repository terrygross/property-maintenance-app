
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReporterStation } from "./types";
import { useAppState } from "@/context/AppStateContext";
import { useState } from "react";
import DeleteConfirmationDialog from "@/components/ui/DeleteConfirmationDialog";

interface StationTableProps {
  stations: ReporterStation[];
  onEdit: (station: ReporterStation) => void;
  onDelete: (stationId: string) => void;
}

const StationTable = ({ stations, onEdit, onDelete }: StationTableProps) => {
  // Get properties from AppState context instead of directly using mockProperties
  const { properties } = useAppState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stationToDelete, setStationToDelete] = useState<ReporterStation | null>(null);
  
  // Find property name by ID
  const getPropertyName = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : "Unknown";
  };

  const handleDeleteClick = (station: ReporterStation) => {
    setStationToDelete(station);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (stationToDelete) {
      onDelete(stationToDelete.id);
      setStationToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Station ID</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stations.map((station) => (
            <TableRow key={station.id}>
              <TableCell>{station.stationId}</TableCell>
              <TableCell>{station.companyName}</TableCell>
              <TableCell>{getPropertyName(station.propertyId)}</TableCell>
              <TableCell>{station.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(station)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(station)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {stations.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No reporter stations found. Click "Add Station" to create one.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        itemName={stationToDelete?.stationId || ""}
        itemType="reporter station"
      />
    </>
  );
};

export default StationTable;
