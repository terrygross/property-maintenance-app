
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServiceProviders } from "@/hooks/useServiceProviders";
import ServiceProviderDialog from "./providers/ServiceProviderDialog";
import ServiceProviderTable from "./providers/ServiceProviderTable";

const ServiceProviders = () => {
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
        <h2 className="text-lg font-medium">Service Providers</h2>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
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

export default ServiceProviders;
