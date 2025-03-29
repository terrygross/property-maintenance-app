
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import StationTable from "./station/StationTable";
import StationDialog from "./station/StationDialog";
import { useStationManagement } from "./station/useStationManagement";

const ReporterStationManagement = () => {
  const {
    stations,
    isDialogOpen,
    selectedStation,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDeleteStation
  } = useStationManagement();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reporter Stations</h2>
        <Button
          onClick={() => handleOpenDialog()}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Station</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <StationTable 
            stations={stations} 
            onEdit={handleOpenDialog}
            onDelete={handleDeleteStation}
          />
        </CardContent>
      </Card>

      <StationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        selectedStation={selectedStation}
      />
    </div>
  );
};

export default ReporterStationManagement;
