
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { mockProperties } from '@/data/mockProperties';
import { MOCK_USERS } from '@/data/mockUsers';
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
  resetToDefaultData: () => void;
}

// Create the context
const AppStateContext = createContext<AppState | undefined>(undefined);

// Provider component
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available, otherwise use mock data
  const [properties, setProperties] = useState<Property[]>(() => {
    const savedProperties = localStorage.getItem('properties');
    return savedProperties ? JSON.parse(savedProperties) : mockProperties;
  });
  
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : MOCK_USERS;
  });
  
  const { toast } = useToast();

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

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
    const newProperty = {
      ...property,
      id: property.id || crypto.randomUUID(),
    };
    setProperties(prev => [...prev, newProperty]);
    toast({
      title: "Property added",
      description: "The property has been added successfully.",
    });
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
    const newUser = {
      ...user,
      id: user.id || String(Date.now()),
    };
    setUsers(prev => [...prev, newUser]);
    toast({
      title: "User created",
      description: "The user has been created successfully.",
    });
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    });
  };

  // Reset to default mock data
  const resetToDefaultData = () => {
    setProperties(mockProperties);
    setUsers(MOCK_USERS);
    toast({
      title: "Data reset",
      description: "All data has been reset to default mock data.",
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
    deleteUser,
    resetToDefaultData
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
