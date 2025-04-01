
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Reporter from "./pages/Reporter";
import MaintenanceTech from "./pages/MaintenanceTech";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import { AppStateProvider } from "./context/AppStateContext";
import { NotificationProvider } from "./context/NotificationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppStateProvider>
      <NotificationProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/reporter" element={<Reporter />} />
                <Route path="/maintenance" element={<MaintenanceTech />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/demo" element={<Demo />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </ThemeProvider>
      </NotificationProvider>
    </AppStateProvider>
  </QueryClientProvider>
);

export default App;
