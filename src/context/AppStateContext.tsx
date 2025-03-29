
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

// Define the shape of our application state
interface AppState {
  properties: Property[];
  users: User[];
  updateProperty: (property: Property) => void;
  addProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  updateUser: (user: User) => void;
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

// Create the context
const AppStateContext = createContext<AppState | undefined>(undefined);

// Provider component
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available, otherwise use empty arrays
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const savedProperties = localStorage.getItem('properties');
      return savedProperties ? JSON.parse(savedProperties) : [];
    } catch (error) {
      console.error("Error loading properties from localStorage:", error);
      return [];
    }
  });
  
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      return [];
    }
  });
  
  const { toast } = useToast();

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

  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error("Error saving users to localStorage:", error);
      toast({
        title: "Error saving users",
        description: "There was an error saving your users. Please try again.",
        variant: "destructive"
      });
    }
  }, [users, toast]);

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

  // User operations
  const updateUser = (user: User) => {
    setUsers(prev => 
      prev.map(u => u.id === user.id ? user : u)
    );
    toast({
      title: "User updated",
      description: "The user has been updated successfully.",
    });
  };

  const addUser = (user: User) => {
    try {
      const newUser = {
        ...user,
        id: user.id || crypto.randomUUID(),
      };
      setUsers(prev => [...prev, newUser]);
      toast({
        title: "User created",
        description: "The user has been created successfully.",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error adding user",
        description: "There was an error adding the user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
  };

  const value = {
    properties,
    users,
    updateProperty,
    addProperty,
    deleteProperty,
    updateUser,
    addUser,
    deleteUser
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook for using the app state
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
