
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mockProperties } from "@/data/mockProperties";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define types for reporter stations
interface ReporterStation {
  id: string;
  stationId: string;
  companyName: string;
  propertyId: string;
  password: string;
  createdAt: string;
}

// Form schema
const stationFormSchema = z.object({
  stationId: z.string().min(1, "Station ID is required"),
  companyName: z.string().min(1, "Company name is required"),
  propertyId: z.string().min(1, "Property is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type StationFormValues = z.infer<typeof stationFormSchema>;

// Mock data for reporter stations
const mockStations: ReporterStation[] = [
  {
    id: "1",
    stationId: "STATION-001",
    companyName: "Building Management Co",
    propertyId: "1",
    password: "******",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    stationId: "STATION-002",
    companyName: "Property Services Ltd",
    propertyId: "2",
    password: "******",
    createdAt: "2023-07-22",
  },
];

const ReporterStationManagement = () => {
  const [stations, setStations] = useState<ReporterStation[]>(mockStations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState<ReporterStation | null>(null);
  
  const form = useForm<StationFormValues>({
    resolver: zodResolver(stationFormSchema),
    defaultValues: {
      stationId: "",
      companyName: "",
      propertyId: "",
      password: "",
    },
  });

  const handleOpenDialog = (station?: ReporterStation) => {
    if (station) {
      setSelectedStation(station);
      form.reset({
        stationId: station.stationId,
        companyName: station.companyName,
        propertyId: station.propertyId,
        password: station.password === "******" ? "" : station.password,
      });
    } else {
      setSelectedStation(null);
      form.reset({
        stationId: "",
        companyName: "",
        propertyId: "",
        password: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  const onSubmit = (data: StationFormValues) => {
    if (selectedStation) {
      // Update existing station
      const updatedStations = stations.map((station) =>
        station.id === selectedStation.id
          ? {
              ...station,
              stationId: data.stationId,
              companyName: data.companyName,
              propertyId: data.propertyId,
              password: data.password || station.password,
            }
          : station
      );
      setStations(updatedStations);
    } else {
      // Add new station
      const newStation: ReporterStation = {
        id: String(Date.now()),
        stationId: data.stationId,
        companyName: data.companyName,
        propertyId: data.propertyId,
        password: data.password,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setStations([...stations, newStation]);
    }
    
    handleCloseDialog();
  };

  const handleDeleteStation = (stationId: string) => {
    setStations(stations.filter((station) => station.id !== stationId));
  };

  // Find property name by ID
  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property ? property.name : "Unknown";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reporter Stations</h2>
        <Button
          onClick={() => handleOpenDialog()}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Station</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station) => (
                <TableRow key={station.id}>
                  <TableCell>{station.stationId}</TableCell>
                  <TableCell>{station.companyName}</TableCell>
                  <TableCell>{getPropertyName(station.propertyId)}</TableCell>
                  <TableCell>{station.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(station)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteStation(station.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {stations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No reporter stations found. Click "Add Station" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reporter Station Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>
            {selectedStation ? "Edit Reporter Station" : "Add Reporter Station"}
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="stationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter station ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockProperties.map(property => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder={selectedStation ? "Leave blank to keep current password" : "Enter password"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedStation ? "Update Station" : "Create Station"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReporterStationManagement;
