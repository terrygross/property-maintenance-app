
import { Building } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyDisplayProps {
  property: Property | undefined;
}

const PropertyDisplay = ({ property }: PropertyDisplayProps) => {
  if (!property) return null;
  
  return (
    <div className="mb-4">
      <div className="bg-muted/50 p-3 rounded-md">
        <h3 className="font-medium flex items-center gap-2">
          <Building className="h-4 w-4" />
          {property.name}
        </h3>
        <p className="text-sm text-muted-foreground">{property.address}, {property.city}, {property.state}</p>
      </div>
    </div>
  );
};

export default PropertyDisplay;
