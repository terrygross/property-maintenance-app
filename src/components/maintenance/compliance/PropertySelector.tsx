
import { Building } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/types/property";

interface PropertySelectorProps {
  properties: Property[];
  selectedPropertyId: string;
  onPropertyChange: (propertyId: string) => void;
}

const PropertySelector = ({ 
  properties, 
  selectedPropertyId, 
  onPropertyChange 
}: PropertySelectorProps) => {
  return (
    <div className="mb-6">
      <label htmlFor="property-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Property
      </label>
      <div className="flex items-center gap-2">
        <Select value={selectedPropertyId} onValueChange={onPropertyChange}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Select a property" />
          </SelectTrigger>
          <SelectContent>
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{property.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PropertySelector;
