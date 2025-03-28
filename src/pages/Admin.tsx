
import { useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Since this is just a demo, we'll allow access without authentication
    // In a real-world scenario, we would check for authentication and admin role
    setLoading(false);
    
    // Commented out authentication check for demo purposes
    // const checkUser = async () => {
    //   const { data } = await supabase.auth.getUser();
    //   setUser(data.user);
    //   setLoading(false);
    // };
    // checkUser();
  }, []);

  // const handleLogin = async () => {
  //   try {
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: "admin@example.com",
  //       password: "password",
  //     });
  //     if (error) throw error;
  //   } catch (error: any) {
  //     toast({
  //       title: "Login failed",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   }
  // };

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
    </div>
  );

  // Commented out authentication flow for demo purposes
  // if (!user) {
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

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <AdminDashboard />
  //   </div>
  // );
};

export default Admin;
