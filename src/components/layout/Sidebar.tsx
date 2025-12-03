import { NavLink } from "react-router-dom";
import {
  Users,
  Factory,
  Cpu,
  Monitor,
  LayoutDashboard,
  Calendar,
  Bell,
  FileText,
  ClipboardList,
  ChevronLeft,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Gestión de Empleados",
    icon: Users,
    path: "/empleados",
  },
  {
    title: "Gestión de Plantas y Fábricas",
    icon: Factory,
    path: "/plantas",
  },
  {
    title: "Gestión de Sensores y Máquinas",
    icon: Cpu,
    path: "/sensores",
  },
  {
    title: "Monitorización de Plantas",
    icon: Monitor,
    path: "/monitorizacion",
  },
  {
    title: "Visualización SCADA",
    icon: Activity,
    path: "/scada",
  },
  {
    title: "Planificación de la Producción",
    icon: Calendar,
    path: "/planificacion",
  },
  {
    title: "Gestión de Alarmas y Notificaciones",
    icon: Bell,
    path: "/alarmas",
  },
  {
    title: "Apartado de Plantillas (Recetas)",
    icon: FileText,
    path: "/plantillas",
  },
  {
    title: "Auditoría y Registro de Actividades",
    icon: ClipboardList,
    path: "/auditoria",
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">Navegación</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-sidebar-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary glow-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* System Status Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="scada-panel p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="status-dot status-dot-operational" />
                <span className="text-xs font-medium text-foreground">Sistema Operativo</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Última sincronización: 14:32:05</p>
                <p>Conexiones activas: 47</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
