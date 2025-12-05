import { useState } from "react";
import { Menu, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import PerfilDialog from "@/components/PerfilDialog";
import ConfiguracionDialog from "@/components/ConfiguracionDialog";

interface AppBarProps {
  onMenuClick: () => void;
  onLogout?: () => void;
}

const AppBar = ({ onMenuClick, onLogout }: AppBarProps) => {
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SC</span>
            </div>
            <div>
              <h1 className="text-lg font-medium text-foreground">
                Sistema de Gestión SCADA
              </h1>
              <p className="text-xs text-muted-foreground">
                Control y Supervisión Industrial
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 bg-card border-border">
              <div className="p-3 border-b border-border">
                <h3 className="font-medium text-foreground">Notificaciones</h3>
              </div>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <span className="text-sm text-foreground">Alarma crítica - Planta Norte</span>
                <span className="text-xs text-muted-foreground">Hace 5 minutos</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <span className="text-sm text-foreground">Sensor S-102 desconectado</span>
                <span className="text-xs text-muted-foreground">Hace 15 minutos</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <span className="text-sm text-foreground">Mantenimiento programado</span>
                <span className="text-xs text-muted-foreground">Hace 1 hora</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setConfigOpen(true)}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem onClick={() => setPerfilOpen(true)}>
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConfigOpen(true)}>
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive cursor-pointer"
                onClick={onLogout}
              >
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <PerfilDialog open={perfilOpen} onOpenChange={setPerfilOpen} />
      <ConfiguracionDialog open={configOpen} onOpenChange={setConfigOpen} />
    </>
  );
};

export default AppBar;
