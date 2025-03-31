
// Helper functions for grid layout

export const getGridClass = (gridColumns: number): string => {
  switch (gridColumns) {
    case 2: return "grid-cols-1 sm:grid-cols-2";
    case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    case 5: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    case 6: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6";
    default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
};
