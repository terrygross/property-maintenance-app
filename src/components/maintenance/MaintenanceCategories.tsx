
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
import { useAppState, MaintenanceCategory } from "@/context/AppStateContext";

const MaintenanceCategories = () => {
  const { maintenanceCategories, setMaintenanceCategories } = useAppState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<MaintenanceCategory> | null>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setCurrentCategory({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: MaintenanceCategory) => {
    setCurrentCategory({ ...category });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentCategory?.name?.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    if (currentCategory.id) {
      // Edit existing category
      setMaintenanceCategories(
        maintenanceCategories.map((c) =>
          c.id === currentCategory.id ? currentCategory as MaintenanceCategory : c
        )
      );
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } else {
      // Add new category
      const newCategory = {
        ...currentCategory,
        id: Math.max(0, ...maintenanceCategories.map((c) => c.id)) + 1,
      } as MaintenanceCategory;
      setMaintenanceCategories([...maintenanceCategories, newCategory]);
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setMaintenanceCategories(maintenanceCategories.filter((c) => c.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Maintenance & Compliance Categories</h2>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category.id)}
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
              {currentCategory?.id ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentCategory?.name || ""}
                onChange={(e) =>
                  setCurrentCategory({ ...currentCategory, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={currentCategory?.description || ""}
                onChange={(e) =>
                  setCurrentCategory({
                    ...currentCategory,
                    description: e.target.value,
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

export default MaintenanceCategories;
