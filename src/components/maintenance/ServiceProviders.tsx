
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data
const initialProviders = [
  { id: 1, name: "ABC Plumbing", contact: "John Doe", phone: "555-1234", email: "john@abcplumbing.com", categories: ["Plumbing"] },
  { id: 2, name: "XYZ Electric", contact: "Jane Smith", phone: "555-5678", email: "jane@xyzelectric.com", categories: ["Electrical"] },
  { id: 3, name: "Cool Air HVAC", contact: "Bob Johnson", phone: "555-9012", email: "bob@coolair.com", categories: ["HVAC"] },
];

const ServiceProviders = () => {
  const [providers, setProviders] = useState(initialProviders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<any>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setCurrentProvider({ name: "", contact: "", phone: "", email: "", categories: [] });
    setIsDialogOpen(true);
  };

  const openEditDialog = (provider: any) => {
    setCurrentProvider({ ...provider });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentProvider.name.trim()) {
      toast({
        title: "Error",
        description: "Provider name is required",
        variant: "destructive",
      });
      return;
    }

    if (currentProvider.id) {
      // Edit existing provider
      setProviders(
        providers.map((p) =>
          p.id === currentProvider.id ? currentProvider : p
        )
      );
      toast({
        title: "Success",
        description: "Provider updated successfully",
      });
    } else {
      // Add new provider
      const newProvider = {
        ...currentProvider,
        id: Math.max(0, ...providers.map((p) => p.id)) + 1,
      };
      setProviders([...providers, newProvider]);
      toast({
        title: "Success",
        description: "Provider added successfully",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this provider?")) {
      setProviders(providers.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "Provider deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Service Providers</h2>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">{provider.name}</TableCell>
              <TableCell>{provider.contact}</TableCell>
              <TableCell>{provider.phone}</TableCell>
              <TableCell>{provider.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(provider)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(provider.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentProvider?.id ? "Edit Provider" : "Add Provider"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentProvider?.name || ""}
                onChange={(e) =>
                  setCurrentProvider({ ...currentProvider, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person</Label>
              <Input
                id="contact"
                value={currentProvider?.contact || ""}
                onChange={(e) =>
                  setCurrentProvider({
                    ...currentProvider,
                    contact: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={currentProvider?.phone || ""}
                onChange={(e) =>
                  setCurrentProvider({
                    ...currentProvider,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={currentProvider?.email || ""}
                onChange={(e) =>
                  setCurrentProvider({
                    ...currentProvider,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceProviders;
