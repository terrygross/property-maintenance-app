
import React, { createContext, useContext, ReactNode } from 'react';
import { AppState } from './types';
import { usePropertyState } from './usePropertyState';
import { useUserState } from './useUserState';
import { useStationState } from './useStationState';

// Create the context
const AppStateContext = createContext<AppState | undefined>(undefined);

// Provider component
export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const propertyState = usePropertyState();
  const userState = useUserState();
  const stationState = useStationState();
  
  // Combine all state pieces into a single value object
  const value: AppState = {
    ...propertyState,
    ...userState,
    ...stationState
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
