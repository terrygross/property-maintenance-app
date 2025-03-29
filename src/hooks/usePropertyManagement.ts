
import { useState } from "react";
import { Property } from "@/types/property";
import { useAppState } from "@/context/AppStateContext";

export function usePropertyManagement() {
  const { properties, addProperty, updateProperty, deleteProperty } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    deleteProperty(id);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveProperty = (property: Property) => {
    if (selectedProperty) {
      // Updating existing property
      updateProperty(property);
    } else {
      // Adding new property
      addProperty(property);
    }
    setIsFormOpen(false);
  };

  return {
    properties: filteredProperties,
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
  };
}
