
import React from "react";
import { Button } from "@/components/ui/button";
import { Columns2, Columns3, Columns4, LayoutGrid } from "lucide-react";

interface GridLayoutSelectorProps {
  gridColumns: number;
  onGridChange: (cols: number) => void;
}

const GridLayoutSelector = ({ gridColumns, onGridChange }: GridLayoutSelectorProps) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
      <span className="text-sm font-medium mr-2 text-gray-600">Layout:</span>
      <Button 
        size="sm" 
        variant={gridColumns === 2 ? "default" : "ghost"} 
        className="h-8 w-8 p-0" 
        onClick={() => onGridChange(2)}
      >
        <Columns2 className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant={gridColumns === 3 ? "default" : "ghost"} 
        className="h-8 w-8 p-0" 
        onClick={() => onGridChange(3)}
      >
        <Columns3 className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant={gridColumns === 4 ? "default" : "ghost"} 
        className="h-8 w-8 p-0" 
        onClick={() => onGridChange(4)}
      >
        <Columns4 className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant={gridColumns === 6 ? "default" : "ghost"} 
        className="h-8 w-8 p-0" 
        onClick={() => onGridChange(6)}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GridLayoutSelector;
