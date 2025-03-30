import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AppStateProvider } from './context/AppStateContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <NotificationProvider>
        <AppStateProvider>
          <Toaster />
          <RouterProvider router={router} />
        </AppStateProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
