
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReporterStation from "@/components/reporter/ReporterStation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Key, Info, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/context/AppStateContext";
import { ScrollArea } from "@/components/ui/scroll-area";

// Storage key for reporter stations - must match the one in useStationManagement
const STORAGE_KEY = 'reporterStations';

// Define a proper type for our station objects
interface StationWithProperty {
  id: string;
  stationId: string;
  password: string;
  name: string;
  propertyId: string;
  propertyName: string;
}

const Reporter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stationId, setStationId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { properties } = useAppState();
  
  // Get stations from localStorage with proper typing
  const [stations, setStations] = useState<StationWithProperty[]>([]);
  
  useEffect(() => {
    const loadStations = () => {
      const savedStations = localStorage.getItem(STORAGE_KEY);
      if (savedStations) {
        try {
          const parsedStations = JSON.parse(savedStations);
          
          // Map stations to the format we need for validation and display
          const formattedStations = parsedStations.map((station: any) => {
            // Find the property for this station to get its name
            const property = properties.find(p => p.id === station.propertyId);
            
            // For debugging
            if (!property) {
              console.log(`No property found for station ${station.stationId} with propertyId ${station.propertyId}`);
              console.log("Available property IDs:", properties.map(p => p.id));
            }
            
            return {
              id: station.id,
              stationId: station.stationId,
              password: station.password,
              propertyId: station.propertyId,
              name: station.companyName || "Station " + station.stationId,
              propertyName: property ? property.name : `Unknown Property (ID: ${station.propertyId})`
            };
          });
          
          setStations(formattedStations);
          
          // Log for debugging
          console.log("Properties:", properties);
          console.log("Formatted stations:", formattedStations);
        } catch (error) {
          console.error("Error parsing saved stations:", error);
          setStations([]);
        }
      } else {
        setStations([]);
      }
    };
    
    loadStations();
  }, [properties]);

  // Filter stations based on search query
  const filteredStations = stations.filter(station => 
    station.stationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Station login validation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate against our available stations
    const station = stations.find(s => s.stationId === stationId && s.password === password);
    
    if (station) {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: `Reporter station ${stationId} authenticated successfully.`,
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid station ID or password.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reporter Station</h1>
          <p className="text-muted-foreground">Report maintenance issues with the property</p>
        </div>
        <Button asChild>
          <Link to="/admin">Back to Admin</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {!isAuthenticated ? (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <span>Reporter Station Login</span>
              </CardTitle>
              <CardDescription>
                Enter your station ID and password to access the reporter interface
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                {stations.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-md flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Available Stations</p>
                      <p>Your system includes these reporter stations:</p>
                      
                      {stations.length > 5 && (
                        <div className="mb-2 mt-1">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="Search stations..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-8"
                            />
                          </div>
                        </div>
                      )}
                      
                      <ScrollArea className={stations.length > 5 ? "h-[150px] pr-4 mt-2" : ""}>
                        <ul className="list-disc pl-5 mt-1">
                          {filteredStations.map(station => (
                            <li key={station.id}>{station.stationId} ({station.propertyName})</li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="stationId">Station ID</Label>
                  <Input
                    id="stationId"
                    placeholder="Enter station ID"
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || stations.length === 0}
                >
                  {isLoading ? "Authenticating..." : "Login to Station"}
                </Button>
                {stations.length === 0 && (
                  <p className="text-sm text-red-500 mt-2 text-center w-full">
                    No reporter stations configured. Please set up stations in the admin panel.
                  </p>
                )}
              </CardFooter>
            </form>
          </Card>
        ) : (
          <ReporterStation stationId={stationId} />
        )}
      </div>
    </div>
  );
};

export default Reporter;
