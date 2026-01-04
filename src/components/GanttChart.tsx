import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface GanttItem {
  id: string;
  nombre: string;
  fechaInicio: string;
  horaInicio: string;
  fechaFin: string;
  horaFin: string;
  planta: string;
  sistema?: string;
  maquina?: string;
  tipo: "produccion" | "mantenimiento";
  estado?: "pendiente" | "en_proceso" | "completada";
}

type PeriodView = "diario" | "semanal" | "mensual";

interface GanttChartProps {
  items: GanttItem[];
  onAddMantenimiento?: () => void;
}

const tipoColors: Record<string, { bg: string; border: string; text: string }> = {
  produccion: {
    bg: "bg-primary/30",
    border: "border-primary/50",
    text: "text-primary",
  },
  mantenimiento: {
    bg: "bg-orange-500/30",
    border: "border-orange-500/50",
    text: "text-orange-400",
  },
};

const estadoColors: Record<string, { bg: string; border: string }> = {
  pendiente: { bg: "bg-warning/30", border: "border-warning/50" },
  en_proceso: { bg: "bg-blue-500/30", border: "border-blue-500/50" },
  completada: { bg: "bg-success/30", border: "border-success/50" },
};

const GanttChart = ({ items, onAddMantenimiento }: GanttChartProps) => {
  const [periodView, setPeriodView] = useState<PeriodView>("diario");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get time slots based on period view
  const timeSlots = useMemo(() => {
    if (periodView === "diario") {
      // 24 hours
      return Array.from({ length: 24 }, (_, i) => ({
        label: `${i.toString().padStart(2, "0")}:00`,
        value: i,
      }));
    } else if (periodView === "semanal") {
      // 7 days
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return {
          label: date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" }),
          value: i,
          date: date.toISOString().split("T")[0],
        };
      });
    } else {
      // 30/31 days of month
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      return Array.from({ length: daysInMonth }, (_, i) => ({
        label: (i + 1).toString(),
        value: i + 1,
        date: `${year}-${(month + 1).toString().padStart(2, "0")}-${(i + 1).toString().padStart(2, "0")}`,
      }));
    }
  }, [periodView, currentDate]);

  // Calculate position and width for each item
  const getItemPosition = (item: GanttItem) => {
    const startDate = new Date(`${item.fechaInicio}T${item.horaInicio}`);
    const endDate = new Date(`${item.fechaFin}T${item.horaFin}`);

    if (periodView === "diario") {
      // Check if item is on the current day
      const currentDay = currentDate.toISOString().split("T")[0];
      if (item.fechaInicio !== currentDay && item.fechaFin !== currentDay) {
        return null;
      }

      const startHour = parseInt(item.horaInicio.split(":")[0]) + parseInt(item.horaInicio.split(":")[1]) / 60;
      const endHour = parseInt(item.horaFin.split(":")[0]) + parseInt(item.horaFin.split(":")[1]) / 60;
      
      const left = (startHour / 24) * 100;
      const width = ((endHour - startHour) / 24) * 100;
      
      return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
    } else if (periodView === "semanal") {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      if (endDate < startOfWeek || startDate > endOfWeek) {
        return null;
      }

      const effectiveStart = startDate < startOfWeek ? startOfWeek : startDate;
      const effectiveEnd = endDate > endOfWeek ? endOfWeek : endDate;

      const weekMs = 7 * 24 * 60 * 60 * 1000;
      const left = ((effectiveStart.getTime() - startOfWeek.getTime()) / weekMs) * 100;
      const width = ((effectiveEnd.getTime() - effectiveStart.getTime()) / weekMs) * 100;

      return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
    } else {
      // Monthly
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
      const daysInMonth = endOfMonth.getDate();

      if (endDate < startOfMonth || startDate > endOfMonth) {
        return null;
      }

      const effectiveStart = startDate < startOfMonth ? startOfMonth : startDate;
      const effectiveEnd = endDate > endOfMonth ? endOfMonth : endDate;

      const startDay = effectiveStart.getDate() - 1 + effectiveStart.getHours() / 24;
      const endDay = effectiveEnd.getDate() - 1 + effectiveEnd.getHours() / 24;

      const left = (startDay / daysInMonth) * 100;
      const width = ((endDay - startDay) / daysInMonth) * 100;

      return { left: `${left}%`, width: `${Math.max(width, 2)}%` };
    }
  };

  // Group items by planta/sistema/maquina
  const groupedItems = useMemo(() => {
    const groups: Record<string, GanttItem[]> = {};
    
    items.forEach((item) => {
      const key = item.maquina || item.sistema || item.planta;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    
    return groups;
  }, [items]);

  const navigate = (direction: number) => {
    const newDate = new Date(currentDate);
    if (periodView === "diario") {
      newDate.setDate(newDate.getDate() + direction);
    } else if (periodView === "semanal") {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const getPeriodLabel = () => {
    if (periodView === "diario") {
      return currentDate.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } else if (periodView === "semanal") {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString("es-ES", { day: "numeric", month: "short" })} - ${endOfWeek.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}`;
    } else {
      return currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Vista Gantt de Producción</CardTitle>
        <div className="flex items-center gap-4">
          {onAddMantenimiento && (
            <Button variant="outline" size="sm" onClick={onAddMantenimiento}>
              <Wrench className="h-4 w-4 mr-2" />
              Añadir Mantenimiento
            </Button>
          )}
          <Select value={periodView} onValueChange={(v) => setPeriodView(v as PeriodView)}>
            <SelectTrigger className="w-[140px] bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diario">Diario</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensual">Mensual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {/* Period navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-foreground font-medium capitalize">{getPeriodLabel()}</span>
          <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${tipoColors.produccion.bg} ${tipoColors.produccion.border} border`} />
            <span className="text-sm text-muted-foreground">Producción</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${tipoColors.mantenimiento.bg} ${tipoColors.mantenimiento.border} border`} />
            <span className="text-sm text-muted-foreground">Mantenimiento</span>
          </div>
          <div className="border-l border-border pl-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${estadoColors.pendiente.bg}`} />
              <span className="text-xs text-muted-foreground">Pendiente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${estadoColors.en_proceso.bg}`} />
              <span className="text-xs text-muted-foreground">En Proceso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${estadoColors.completada.bg}`} />
              <span className="text-xs text-muted-foreground">Completada</span>
            </div>
          </div>
        </div>

        {/* Gantt chart */}
        <div className="border border-border rounded-lg overflow-hidden">
          {/* Time header */}
          <div className="flex bg-muted/30">
            <div className="w-48 flex-shrink-0 px-3 py-2 border-r border-border">
              <span className="text-sm font-medium text-muted-foreground">Recurso</span>
            </div>
            <div className="flex-1 flex">
              {timeSlots.map((slot, i) => (
                <div
                  key={i}
                  className="flex-1 text-center py-2 text-xs text-muted-foreground border-r border-border last:border-r-0"
                  style={{ minWidth: periodView === "mensual" ? "24px" : "auto" }}
                >
                  {slot.label}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <TooltipProvider>
            {Object.entries(groupedItems).length === 0 ? (
              <div className="px-3 py-8 text-center text-muted-foreground">
                No hay eventos programados para este período
              </div>
            ) : (
              Object.entries(groupedItems).map(([resource, resourceItems]) => (
                <div key={resource} className="flex border-t border-border">
                  <div className="w-48 flex-shrink-0 px-3 py-3 border-r border-border bg-muted/10">
                    <span className="text-sm text-foreground truncate block">{resource}</span>
                  </div>
                  <div className="flex-1 relative h-12">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {timeSlots.map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 border-r border-border/30 last:border-r-0"
                          style={{ minWidth: periodView === "mensual" ? "24px" : "auto" }}
                        />
                      ))}
                    </div>

                    {/* Items */}
                    {resourceItems.map((item) => {
                      const position = getItemPosition(item);
                      if (!position) return null;

                      const colorConfig = tipoColors[item.tipo];
                      const estadoConfig = item.estado ? estadoColors[item.estado] : null;

                      return (
                        <Tooltip key={item.id}>
                          <TooltipTrigger asChild>
                            <div
                              className={`absolute top-1 bottom-1 rounded ${colorConfig.bg} ${colorConfig.border} border cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden`}
                              style={{ left: position.left, width: position.width }}
                            >
                              {estadoConfig && (
                                <div className={`absolute left-1 w-2 h-2 rounded-full ${estadoConfig.bg}`} />
                              )}
                              <span className={`text-xs ${colorConfig.text} truncate px-2 font-medium`}>
                                {item.nombre}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <div className="space-y-1">
                              <p className="font-medium">{item.nombre}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.fechaInicio} {item.horaInicio} - {item.fechaFin} {item.horaFin}
                              </p>
                              <div className="flex gap-2">
                                <Badge variant="outline" className={`${colorConfig.bg} ${colorConfig.text} text-xs`}>
                                  {item.tipo === "produccion" ? "Producción" : "Mantenimiento"}
                                </Badge>
                                {item.estado && (
                                  <Badge variant="outline" className="text-xs">
                                    {item.estado.replace("_", " ")}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttChart;
