
import { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ShieldAlert } from "lucide-react";
import { hasAdminAccess } from "@/types/user";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // For this demo, we'll simulate a check for admin roles
    // In a real implementation, we would check for authentication and admin role
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        
        // In a real implementation, we would check if the user has admin role
        // Simulating role check for demo purposes
        const userResponse = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user?.id)
          .single();
        
        if (userResponse.data) {
          const hasAccess = hasAdminAccess(userResponse.data.role);
          setIsAdmin(hasAccess);
          
          if (!hasAccess) {
            toast({
              title: "Access Denied",
              description: "You don't have permission to access the admin panel.",
              variant: "destructive",
            });
            
            // Redirect to appropriate page based on role
            if (userResponse.data.role === "maintenance_tech" || userResponse.data.role === "contractor") {
              navigate("/maintenance");
            } else if (userResponse.data.role === "reporter") {
              navigate("/reporter");
            } else {
              navigate("/");
            }
          }
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Since this is just a demo, we'll set loading to false without authentication
    // In a real implementation, we would use checkUser()
    setLoading(false);
    setIsAdmin(true); // For demo purposes
    
    // Commented out for demo purposes
    // checkUser();
  }, [toast, navigate]);

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "password",
      });
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "You have been logged in as an admin.",
      });
      
      // Set the user and isAdmin state after successful login
      setUser(await (await supabase.auth.getUser()).data.user);
      setIsAdmin(true);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse p-8 rounded-lg bg-white shadow">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // For demo purposes, we're showing the dashboard without authentication
  // In a real implementation, we would check if the user is authenticated and has admin role
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
      
      {/* This alert is visible only in demo mode to explain the authentication process - made smaller */}
      <div className="fixed bottom-4 right-4 max-w-[280px]">
        <Alert variant="default" className="bg-yellow-50 border-yellow-200 p-3 text-xs shadow-md">
          <AlertCircle className="h-3 w-3 text-yellow-600" />
          <AlertTitle className="text-xs font-medium">Demo Mode</AlertTitle>
          <AlertDescription className="text-xs">
            In production, this admin dashboard would require authentication and proper role verification.
            Only Admin and Maintenance Manager roles have access.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );

  // Commented out authentication flow for production use
  // if (!user || !isAdmin) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="p-8 rounded-lg bg-white shadow max-w-md w-full">
  //         <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
  //         <p className="text-center mb-6 text-muted-foreground">
  //           Please login to access the admin dashboard.
  //         </p>
  //         <Button className="w-full" onClick={handleLogin}>
  //           Login
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (user && !isAdmin) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="p-8 rounded-lg bg-white shadow max-w-md w-full text-center">
  //         <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
  //         <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
  //         <p className="mb-6 text-muted-foreground">
  //           You don't have permission to access the admin panel.
  //         </p>
  //         <Button className="w-full" onClick={() => navigate("/")}>
  //           Return Home
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <AdminDashboard />
  //   </div>
  // );
};

export default Admin;
