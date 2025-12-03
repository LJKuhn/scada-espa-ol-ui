import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import GestionEmpleados from "@/pages/GestionEmpleados";
import MonitorizacionSCADA from "@/pages/MonitorizacionSCADA";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/empleados" element={<GestionEmpleados />} />
            <Route path="/plantas" element={<PlaceholderPage />} />
            <Route path="/sensores" element={<PlaceholderPage />} />
            <Route path="/monitorizacion" element={<MonitorizacionSCADA />} />
            <Route path="/scada" element={<PlaceholderPage />} />
            <Route path="/planificacion" element={<PlaceholderPage />} />
            <Route path="/alarmas" element={<PlaceholderPage />} />
            <Route path="/plantillas" element={<PlaceholderPage />} />
            <Route path="/auditoria" element={<PlaceholderPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
