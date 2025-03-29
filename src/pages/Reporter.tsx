
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReporterStation from "@/components/reporter/ReporterStation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Key, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reporter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stationId, setStationId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Basic plan allows only 2 stations
  const validStations = [
    { id: "STATION-001", password: "station123", name: "Main Building" },
    { id: "STATION-002", password: "property456", name: "Property Office" }
  ];

  // Mock station login - in a real app, this would validate against the database
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Validate against our available stations (Basic plan has 2)
      const station = validStations.find(s => s.id === stationId && s.password === password);
      
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
      }
      setIsLoading(false);
    }, 1000);
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
                <div className="p-3 bg-blue-50 rounded-md flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Basic Plan Information</p>
                    <p>Your plan includes 2 reporter stations:</p>
                    <ul className="list-disc pl-5 mt-1">
                      <li>STATION-001 (Main Building)</li>
                      <li>STATION-002 (Property Office)</li>
                    </ul>
                  </div>
                </div>
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
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Login to Station"}
                </Button>
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
