
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AppState } from './types';
import { usePropertyState } from './usePropertyState';
import { useUserState } from './useUserState';
import { useStationState } from './useStationState';
import { User } from '@/types/user';

// Create the context
const AppStateContext = createContext<AppState | undefined>(undefined);

// Provider component
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const propertyState = usePropertyState();
  const userState = useUserState();
  const stationState = useStationState();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // For demo purposes, set a default user if none exists
  // In a real app, this would come from authentication
  React.useEffect(() => {
    if (userState.users.length > 0 && !currentUser) {
      // Default to the first user for demo purposes
      setCurrentUser(userState.users[0]);
    }
  }, [userState.users, currentUser]);
  
  // Combine all state pieces into a single value object
  const value: AppState = {
    ...propertyState,
    ...userState,
    ...stationState,
    currentUser
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
