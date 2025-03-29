
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useStationState = () => {
  const { toast } = useToast();
  
  // Add state for tracking additional reporter stations
  const [additionalStations, setAdditionalStations] = useState<number>(() => {
    try {
      const savedAdditionalStations = localStorage.getItem('additionalStations');
      return savedAdditionalStations ? parseInt(savedAdditionalStations, 10) : 0;
    } catch (error) {
      console.error("Error loading additional stations from localStorage:", error);
      return 0;
    }
  });

  // Save additional stations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('additionalStations', additionalStations.toString());
    } catch (error) {
      console.error("Error saving additional stations to localStorage:", error);
      toast({
        title: "Error saving subscription data",
        description: "There was an error saving your subscription data. Please try again.",
        variant: "destructive"
      });
    }
  }, [additionalStations, toast]);

  // Function to update additional stations
  const updateAdditionalStations = (count: number) => {
    setAdditionalStations(count);
    toast({
      title: "Subscription updated",
      description: `Your additional stations have been updated to ${count}.`,
    });
  };

  // Calculate total reporter stations - base 2 for Basic plan + additional purchased
  const reporterStations = 2 + additionalStations;

  return {
    reporterStations,
    additionalStations,
    updateAdditionalStations
  };
};
