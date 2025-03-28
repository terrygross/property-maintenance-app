
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface PropertySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddProperty: () => void;
}

const PropertySearch = ({ 
  searchTerm, 
  onSearchChange, 
  onAddProperty 
}: PropertySearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search properties..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button onClick={onAddProperty}>
        <Plus className="h-4 w-4 mr-2" />
        Add Property
      </Button>
    </div>
  );
};

export default PropertySearch;
