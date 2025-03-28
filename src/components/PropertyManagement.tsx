
import PropertySearch from "./property/PropertySearch";
import PropertyTable from "./property/PropertyTable";
import PropertyFormDialog from "./property/PropertyFormDialog";
import { usePropertyManagement } from "@/hooks/usePropertyManagement";

const PropertyManagement = () => {
  const {
    properties,
    searchTerm,
    selectedProperty,
    isFormOpen,
    setIsFormOpen,
    setSearchTerm,
    handleAddProperty,
    handleEditProperty,
    handleDeleteProperty,
    handleCloseForm,
    handleSaveProperty
  } = usePropertyManagement();

  return (
    <div className="space-y-4">
      <PropertySearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddProperty={handleAddProperty}
      />

      <PropertyTable 
        properties={properties}
        onEdit={handleEditProperty}
        onDelete={handleDeleteProperty}
      />

      <PropertyFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        selectedProperty={selectedProperty}
        onSave={handleSaveProperty}
        onCancel={handleCloseForm}
      />
    </div>
  );
};

export default PropertyManagement;
