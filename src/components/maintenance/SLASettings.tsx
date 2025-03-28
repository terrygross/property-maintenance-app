
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
const initialSLAs = [
  { id: 1, name: "Emergency", responseTime: 1, responseUnit: "hours", resolutionTime: 24, resolutionUnit: "hours", priority: "High" },
  { id: 2, name: "Standard", responseTime: 24, responseUnit: "hours", resolutionTime: 72, resolutionUnit: "hours", priority: "Medium" },
  { id: 3, name: "Low Priority", responseTime: 48, responseUnit: "hours", resolutionTime: 7, resolutionUnit: "days", priority: "Low" },
];

const SLASettings = () => {
  const [slas, setSLAs] = useState(initialSLAs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSLA, setCurrentSLA] = useState<any>(null);
  const { toast } = useToast();

  const openAddDialog = () => {
    setCurrentSLA({ 
      name: "", 
      responseTime: 24, 
      responseUnit: "hours", 
      resolutionTime: 48, 
      resolutionUnit: "hours", 
      priority: "Medium" 
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (sla: any) => {
    setCurrentSLA({ ...sla });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentSLA.name.trim()) {
      toast({
        title: "Error",
        description: "SLA name is required",
        variant: "destructive",
      });
      return;
    }

    if (currentSLA.id) {
      // Edit existing SLA
      setSLAs(
        slas.map((s) =>
          s.id === currentSLA.id ? currentSLA : s
        )
      );
      toast({
        title: "Success",
        description: "SLA updated successfully",
      });
    } else {
      // Add new SLA
      const newSLA = {
        ...currentSLA,
        id: Math.max(0, ...slas.map((s) => s.id)) + 1,
      };
      setSLAs([...slas, newSLA]);
      toast({
        title: "Success",
        description: "SLA added successfully",
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this SLA?")) {
      setSLAs(slas.filter((s) => s.id !== id));
      toast({
        title: "Success",
        description: "SLA deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Service Level Agreements</h2>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add SLA
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Response Time</TableHead>
            <TableHead>Resolution Time</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slas.map((sla) => (
            <TableRow key={sla.id}>
              <TableCell className="font-medium">{sla.name}</TableCell>
              <TableCell>{`${sla.responseTime} ${sla.responseUnit}`}</TableCell>
              <TableCell>{`${sla.resolutionTime} ${sla.resolutionUnit}`}</TableCell>
              <TableCell>{sla.priority}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(sla)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(sla.id)}
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
              {currentSLA?.id ? "Edit SLA" : "Add SLA"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentSLA?.name || ""}
                onChange={(e) =>
                  setCurrentSLA({ ...currentSLA, name: e.target.value })
                }
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="responseTime">Response Time</Label>
                <Input
                  id="responseTime"
                  type="number"
                  min="1"
                  value={currentSLA?.responseTime || ""}
                  onChange={(e) =>
                    setCurrentSLA({
                      ...currentSLA,
                      responseTime: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responseUnit">Unit</Label>
                <Select
                  value={currentSLA?.responseUnit || "hours"}
                  onValueChange={(value) =>
                    setCurrentSLA({ ...currentSLA, responseUnit: value })
                  }
                >
                  <SelectTrigger id="responseUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resolutionTime">Resolution Time</Label>
                <Input
                  id="resolutionTime"
                  type="number"
                  min="1"
                  value={currentSLA?.resolutionTime || ""}
                  onChange={(e) =>
                    setCurrentSLA({
                      ...currentSLA,
                      resolutionTime: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resolutionUnit">Unit</Label>
                <Select
                  value={currentSLA?.resolutionUnit || "hours"}
                  onValueChange={(value) =>
                    setCurrentSLA({ ...currentSLA, resolutionUnit: value })
                  }
                >
                  <SelectTrigger id="resolutionUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={currentSLA?.priority || "Medium"}
                onValueChange={(value) =>
                  setCurrentSLA({ ...currentSLA, priority: value })
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
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

export default SLASettings;
