
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import ServiceProviderDialog from "./providers/ServiceProviderDialog";
import ServiceProviderTable from "./providers/ServiceProviderTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Contractors = () => {
  const {
    providers,
    isDialogOpen,
    setIsDialogOpen,
    currentProvider,
    setCurrentProvider,
    openAddDialog,
    openEditDialog,
    handleSave,
    handleDelete,
  } = useServiceProviders();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-medium">Contractors</h2>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contractor
        </Button>
      </div>

      <ServiceProviderTable 
        providers={providers} 
        onEdit={openEditDialog} 
        onDelete={handleDelete} 
      />

      <ServiceProviderDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentProvider={currentProvider}
        setCurrentProvider={setCurrentProvider}
        onSave={handleSave}
      />
    </div>
  );
};

export default Contractors;
