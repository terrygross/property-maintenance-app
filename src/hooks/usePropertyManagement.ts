
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";

export function usePropertyManagement() {
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
      // Updating existing property
      setProperties(properties.map((p) => (p.id === property.id ? property : p)));
      toast({
        title: "Property updated",
        description: "The property has been updated successfully.",
      });
    } else {
      // Adding new property with a properly formatted ID
      const newProperty = {
        ...property,
        id: crypto.randomUUID(), // Using a more reliable ID generation method
      };
      setProperties([...properties, newProperty]);
      toast({
        title: "Property added",
        description: "The property has been added successfully.",
      });
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
