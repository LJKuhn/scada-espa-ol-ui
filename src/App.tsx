import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import GestionEmpleados from "@/pages/GestionEmpleados";
import GestionPlantas from "@/pages/GestionPlantas";
import GestionSensores from "@/pages/GestionSensores";
import MonitorizacionSCADA from "@/pages/MonitorizacionSCADA";
import VisualizacionSCADA from "@/pages/VisualizacionSCADA";
import GestionAlarmas from "@/pages/GestionAlarmas";
import Auditoria from "@/pages/Auditoria";
import PlanificacionProduccion from "@/pages/PlanificacionProduccion";
import GestionPlantillas from "@/pages/GestionPlantillas";
import ConfiguracionMQTT from "@/pages/ConfiguracionMQTT";
import AdministracionAlmacenamiento from "@/pages/AdministracionAlmacenamiento";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import LandingPage from "@/pages/LandingPage";
import { StorageProvider } from "@/contexts/StorageContext";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <StorageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Landing page is always accessible */}
              <Route path="/" element={<LandingPage />} />
              
              {!isAuthenticated ? (
                <>
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              ) : (
                <>
                  <Route element={<MainLayout onLogout={handleLogout} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/empleados" element={<GestionEmpleados />} />
                    <Route path="/plantas" element={<GestionPlantas />} />
                    <Route path="/sensores" element={<GestionSensores />} />
                    <Route path="/monitorizacion" element={<MonitorizacionSCADA />} />
                    <Route path="/scada" element={<VisualizacionSCADA />} />
                    <Route path="/planificacion" element={<PlanificacionProduccion />} />
                    <Route path="/alarmas" element={<GestionAlarmas />} />
                    <Route path="/plantillas" element={<GestionPlantillas />} />
                    <Route path="/auditoria" element={<Auditoria />} />
                    <Route path="/comunicacion" element={<ConfiguracionMQTT />} />
                    <Route path="/almacenamiento" element={<AdministracionAlmacenamiento />} />
                  </Route>
                  <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </StorageProvider>
    </QueryClientProvider>
  );
};

export default App;
