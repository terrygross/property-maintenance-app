
import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { useToast } from '@/hooks/use-toast';

export const usePropertyState = () => {
  const { toast } = useToast();
  
  // Initialize state from localStorage if available, otherwise use empty array
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const savedProperties = localStorage.getItem('properties');
      return savedProperties ? JSON.parse(savedProperties) : [];
    } catch (error) {
      console.error("Error loading properties from localStorage:", error);
      return [];
    }
  });

  // Persist to localStorage whenever state changes with error handling
  useEffect(() => {
    try {
      localStorage.setItem('properties', JSON.stringify(properties));
    } catch (error) {
      console.error("Error saving properties to localStorage:", error);
      toast({
        title: "Error saving properties",
        description: "There was an error saving your properties. Please try again.",
        variant: "destructive"
      });
    }
  }, [properties, toast]);

  // Property operations
  const updateProperty = (property: Property) => {
    setProperties(prev => 
      prev.map(p => p.id === property.id ? property : p)
    );
    toast({
      title: "Property updated",
      description: "The property has been updated successfully.",
    });
  };

  const addProperty = (property: Property) => {
    try {
      const newProperty = {
        ...property,
        id: property.id || crypto.randomUUID(),
      };
      setProperties(prev => [...prev, newProperty]);
      toast({
        title: "Property added",
        description: "The property has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding property:", error);
      toast({
        title: "Error adding property",
        description: "There was an error adding your property. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Property deleted",
      description: "The property has been removed successfully.",
    });
  };

  return {
    properties,
    updateProperty,
    addProperty,
    deleteProperty
  };
};
