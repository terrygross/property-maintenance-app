
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";

// Get only contractors from the users
const getProvidersFromUsers = (users: any[]) => users
  .filter(user => user.role === "contractor")
  .map(user => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name} - ${user.title}`,
    contact: user.first_name + " " + user.last_name,
    phone: user.phone,
    email: user.email,
    photo_url: user.photo_url,
    categories: [user.title.split(" ")[0]] // Use the first word of their title as category
  }));

export interface ServiceProvider {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  photo_url: string;
  categories: string[];
}

export const useServiceProviders = () => {
  const { users } = useAppState();
  const [providers, setProviders] = useState<ServiceProvider[]>(getProvidersFromUsers(users));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<ServiceProvider | null>(null);
  const { toast } = useToast();

  // Update providers when users change
  useEffect(() => {
    setProviders(getProvidersFromUsers(users));
  }, [users]);

  const openAddDialog = () => {
    setCurrentProvider({ id: "", name: "", contact: "", phone: "", email: "", categories: [], photo_url: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (provider: ServiceProvider) => {
    setCurrentProvider({ ...provider });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentProvider || !currentProvider.name.trim()) {
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

  return {
    providers,
    isDialogOpen,
    setIsDialogOpen,
    currentProvider,
    setCurrentProvider,
    openAddDialog,
    openEditDialog,
    handleSave,
    handleDelete,
  };
};
