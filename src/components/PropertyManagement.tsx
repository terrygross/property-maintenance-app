
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Building, Pencil, Trash2, Plus } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle 
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import PropertyForm from "./PropertyForm";
import { Property, PropertyType } from "@/types/property";

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90210",
    type: "residential",
    units: 24,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    contactEmail: "management@sunsetapts.com",
    contactPhone: "555-123-4567"
  },
  {
    id: "2",
    name: "Downtown Plaza",
    address: "456 Main Street",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    type: "commercial",
    units: 15,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    contactEmail: "leasing@downtownplaza.com",
    contactPhone: "555-987-6543"
  },
  {
    id: "3",
    name: "Riverfront Warehouse",
    address: "789 River Road",
    city: "Detroit",
    state: "MI",
    zipCode: "48226",
    type: "industrial",
    units: 5,
    status: "maintenance",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    contactEmail: "operations@riverfrontware.com",
    contactPhone: "555-456-7890"
  },
  {
    id: "4",
    name: "Oakwood Heights",
    address: "321 Oak Avenue",
    city: "Atlanta",
    state: "GA",
    zipCode: "30303",
    type: "residential",
    units: 48,
    status: "inactive",
    imageUrl: "https://images.unsplash.com/photo-1494526585095-c41caee0a0c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    contactEmail: "info@oakwoodheights.com",
    contactPhone: "555-789-0123"
  },
  {
    id: "5",
    name: "The Nexus Building",
    address: "555 Tech Drive",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    type: "mixed_use",
    units: 60,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1577619676783-a37d59dee247?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    contactEmail: "admin@nexusbuilding.com",
    contactPhone: "555-234-5678"
  }
];

const PropertyManagement = () => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const isDesktop = !useIsMobile();

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setIsFormOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsFormOpen(true);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((property) => property.id !== id));
    toast({
      title: "Property deleted",
      description: "The property has been removed successfully.",
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveProperty = (property: Property) => {
    if (selectedProperty) {
      setProperties(properties.map((p) => (p.id === property.id ? property : p)));
      toast({
        title: "Property updated",
        description: "The property has been updated successfully.",
      });
    } else {
      const newProperty = {
        ...property,
        id: String(Date.now()), // Temporary ID for mock data
      };
      setProperties([...properties, newProperty]);
      toast({
        title: "Property added",
        description: "The property has been added successfully.",
      });
    }
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPropertyTypeDisplay = (type: PropertyType) => {
    switch (type) {
      case "residential":
        return "Residential";
      case "commercial":
        return "Commercial";
      case "industrial":
        return "Industrial";
      case "mixed_use":
        return "Mixed Use";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddProperty}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Units</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                        {property.imageUrl ? (
                          <img
                            src={property.imageUrl}
                            alt={property.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Building className="h-6 w-6 m-2 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{property.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {property.city}, {property.state}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {property.city}, {property.state}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getPropertyTypeDisplay(property.type)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {property.units}
                  </TableCell>
                  <TableCell>{getStatusBadge(property.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProperty(property)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {isDesktop ? (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedProperty ? "Edit Property" : "Add Property"}
              </DialogTitle>
            </DialogHeader>
            <PropertyForm
              property={selectedProperty}
              onSave={handleSaveProperty}
              onCancel={handleCloseForm}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {selectedProperty ? "Edit Property" : "Add Property"}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4">
              <PropertyForm
                property={selectedProperty}
                onSave={handleSaveProperty}
                onCancel={handleCloseForm}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default PropertyManagement;
