import { useMemo, useState } from "react";
import { AuditLog } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Clock, Activity } from "lucide-react";

interface HistorialEmpleadoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nombreEmpleado: string;
  logs: AuditLog[];
}

const getAccionColor = (accion: string) => {
  if (accion.includes("Eliminación") || accion.includes("Bloqueo")) return "destructive";
  if (accion.includes("Alta") || accion.includes("Desbloqueo")) return "default";
  if (accion.includes("Cambio") || accion.includes("Modificación")) return "secondary";
  return "outline";
};

const HistorialEmpleadoDialog = ({ open, onOpenChange, nombreEmpleado, logs }: HistorialEmpleadoDialogProps) => {
  const [busqueda, setBusqueda] = useState("");

  const logsFiltrados = useMemo(() => {
    if (!busqueda) return logs;
    const q = busqueda.toLowerCase();
    return logs.filter(
      (l) =>
        l.accion.toLowerCase().includes(q) ||
        l.objetoAfectado.toLowerCase().includes(q) ||
        l.modulo.toLowerCase().includes(q)
    );
  }, [logs, busqueda]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Historial de {nombreEmpleado}
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filtrar acciones..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="h-80">
          {logsFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Clock className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">No hay registros de actividad</p>
            </div>
          ) : (
            <div className="space-y-2 pr-3">
              {logsFiltrados.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg border border-border bg-muted/20 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={getAccionColor(log.accion)} className="text-xs">
                      {log.accion}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {log.fechaHora}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{log.objetoAfectado}</p>
                  <p className="text-xs text-muted-foreground">Módulo: {log.modulo}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="text-xs text-muted-foreground text-right">
          {logsFiltrados.length} registro{logsFiltrados.length !== 1 ? "s" : ""}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistorialEmpleadoDialog;
