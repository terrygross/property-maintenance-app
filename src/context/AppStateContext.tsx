
import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/user";
import { Property } from "@/types/property";
import { mockUsers } from "@/data/mockUsers";
import { mockProperties } from "@/data/mockProperties";

export interface MaintenanceCategory {
  id: number;
  name: string;
  description: string;
}

export interface AppStateContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  properties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  maintenanceCategories: MaintenanceCategory[];
  setMaintenanceCategories: React.Dispatch<React.SetStateAction<MaintenanceCategory[]>>;
}

const initialMaintenanceCategories: MaintenanceCategory[] = [
  { id: 1, name: "Plumbing", description: "Water and drainage issues" },
  { id: 2, name: "Electrical", description: "Power and lighting issues" },
  { id: 3, name: "HVAC", description: "Heating, ventilation, and air conditioning" },
  { id: 4, name: "Structural", description: "Building structural issues" },
  { id: 5, name: "Safety", description: "Safety and security issues" },
  { id: 6, name: "Legal", description: "Legal compliance requirements" },
  { id: 7, name: "Inspection", description: "Regular inspection tasks" },
  { id: 8, name: "Insurance", description: "Insurance related requirements" },
  { id: 9, name: "Training", description: "Staff training requirements" },
  { id: 10, name: "Administrative", description: "Administrative tasks" },
];

// Create the context
const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Create a provider component
export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [maintenanceCategories, setMaintenanceCategories] = useState<MaintenanceCategory[]>(initialMaintenanceCategories);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const addProperty = (property: Property) => {
    setProperties(prev => [...prev, property]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(property => property.id === updatedProperty.id ? updatedProperty : property));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
  };

  return (
    <AppStateContext.Provider value={{ 
      users, 
      addUser, 
      updateUser, 
      deleteUser, 
      properties, 
      addProperty, 
      updateProperty, 
      deleteProperty,
      maintenanceCategories,
      setMaintenanceCategories
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to use the app state context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
