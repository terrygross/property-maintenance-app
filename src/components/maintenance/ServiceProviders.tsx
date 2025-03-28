
import { useState, useEffect } from "react";
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
import { MOCK_USERS } from "@/data/mockUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Get only contractors from the mock users
const contractorUsers = MOCK_USERS.filter(user => user.role === "contractor");

// Convert contractor users to service providers
const getInitialProviders = () => contractorUsers.map(user => ({
  id: user.id,
  name: `${user.first_name} ${user.last_name} - ${user.title}`,
  contact: user.first_name + " " + user.last_name,
  phone: user.phone,
  email: user.email,
  photo_url: user.photo_url,
  categories: [user.title.split(" ")[0]] // Use the first word of their title as category (e.g., "Plumbing" from "Plumbing Contractor")
}));

const ServiceProviders = () => {
  const [providers, setProviders] = useState(getInitialProviders());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<any>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setCurrentProvider({ name: "", contact: "", phone: "", email: "", categories: [], photo_url: "" });
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
        id: String(Date.now()), // Create a new ID
      };
      setProviders([...providers, newProvider]);
      toast({
        title: "Success",
        description: "Provider added successfully",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
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
            <TableHead>Provider</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={provider.photo_url} alt={provider.name} />
                    <AvatarFallback>
                      {provider.name?.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-xs text-muted-foreground">{provider.categories.join(', ')}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{provider.contact}</TableCell>
              <TableCell className="hidden md:table-cell">{provider.phone}</TableCell>
              <TableCell className="hidden md:table-cell">{provider.email}</TableCell>
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
