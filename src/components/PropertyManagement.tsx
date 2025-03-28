
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";
import PropertySearch from "./property/PropertySearch";
import PropertyTable from "./property/PropertyTable";
import PropertyFormDialog from "./property/PropertyFormDialog";
import { mockProperties } from "@/data/mockProperties";

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setIsFormOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsFormOpen(true);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((property) => property.id !== id));
    toast({
      title: "Property deleted",
      description: "The property has been removed successfully.",
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveProperty = (property: Property) => {
    if (selectedProperty) {
      setProperties(properties.map((p) => (p.id === property.id ? property : p)));
      toast({
        title: "Property updated",
        description: "The property has been updated successfully.",
      });
    } else {
      const newProperty = {
        ...property,
        id: String(Date.now()), // Temporary ID for mock data
      };
      setProperties([...properties, newProperty]);
      toast({
        title: "Property added",
        description: "The property has been added successfully.",
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-4">
      <PropertySearch 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddProperty={handleAddProperty}
      />

      <PropertyTable 
        properties={filteredProperties}
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
