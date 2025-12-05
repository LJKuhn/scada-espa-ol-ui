import { useState, useMemo } from "react";
import { Factory, AlertTriangle, Activity, Clock, Zap, Thermometer, Gauge, TrendingUp, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Planta {
  id: string;
  nombre: string;
  estado: "operativo" | "advertencia" | "critico" | "offline";
  produccion: number;
  eficiencia: number;
  temperatura: number;
  consumoEnergia: number;
  alarmasActivas: number;
}

const plantas: Planta[] = [
  { id: "PLT-001", nombre: "Planta Norte", estado: "operativo", produccion: 87, eficiencia: 94, temperatura: 42, consumoEnergia: 2450, alarmasActivas: 0 },
  { id: "PLT-002", nombre: "Planta Central", estado: "advertencia", produccion: 65, eficiencia: 78, temperatura: 58, consumoEnergia: 3120, alarmasActivas: 2 },
  { id: "PLT-003", nombre: "Planta Sur", estado: "operativo", produccion: 92, eficiencia: 96, temperatura: 38, consumoEnergia: 2100, alarmasActivas: 0 },
  { id: "PLT-004", nombre: "Fábrica Este", estado: "critico", produccion: 23, eficiencia: 45, temperatura: 72, consumoEnergia: 1800, alarmasActivas: 5 },
  { id: "PLT-005", nombre: "Fábrica Oeste", estado: "offline", produccion: 0, eficiencia: 0, temperatura: 22, consumoEnergia: 150, alarmasActivas: 1 },
];

const getEstadoConfig = (estado: Planta["estado"]) => {
  switch (estado) {
    case "operativo": return { label: "Operativo", dotClass: "status-dot-operational", badgeClass: "bg-success/20 text-success border-success/30" };
    case "advertencia": return { label: "Advertencia", dotClass: "status-dot-warning", badgeClass: "bg-warning/20 text-warning border-warning/30" };
    case "critico": return { label: "Crítico", dotClass: "status-dot-critical", badgeClass: "bg-destructive/20 text-destructive border-destructive/30" };
    case "offline": return { label: "Offline", dotClass: "status-dot-offline", badgeClass: "bg-muted text-muted-foreground border-muted" };
  }
};

const MonitorizacionSCADA = () => {
  const [selectedPlanta, setSelectedPlanta] = useState<Planta>(plantas[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  const plantasFiltradas = useMemo(() => {
    return plantas.filter((planta) => {
      const matchesSearch = planta.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           planta.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEstado = filtroEstado === "todos" || planta.estado === filtroEstado;
      return matchesSearch && matchesEstado;
    });
  }, [searchQuery, filtroEstado]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Monitorización SCADA</h1>
        <p className="text-muted-foreground mt-1">Supervisión en tiempo real de todas las plantas y fábricas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Plant List Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground px-1">Plantas Activas</h3>
          
          {/* Search and Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar planta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background border-border"
              />
            </div>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Filtrar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="operativo">Operativo</SelectItem>
                <SelectItem value="advertencia">Advertencia</SelectItem>
                <SelectItem value="critico">Crítico</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {plantasFiltradas.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No se encontraron plantas</p>
            ) : (
              plantasFiltradas.map((planta) => {
                const estadoConfig = getEstadoConfig(planta.estado);
                const isSelected = selectedPlanta.id === planta.id;

                return (
                  <button
                    key={planta.id}
                    onClick={() => setSelectedPlanta(planta)}
                    className={cn(
                      "w-full p-4 rounded-lg border transition-all duration-200 text-left",
                      isSelected ? "bg-primary/10 border-primary glow-primary" : "scada-panel border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Factory className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{planta.nombre}</span>
                      </div>
                      <div className={cn("status-dot", estadoConfig.dotClass)} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Producción</span>
                      <span className="text-foreground font-mono">{planta.produccion}%</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Plant Header */}
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Factory className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{selectedPlanta.nombre}</h2>
                    <p className="text-sm text-muted-foreground font-mono">ID: {selectedPlanta.id}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getEstadoConfig(selectedPlanta.estado).badgeClass}>
                  <div className={cn("status-dot mr-2", getEstadoConfig(selectedPlanta.estado).dotClass)} />
                  {getEstadoConfig(selectedPlanta.estado).label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Status Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Estado de Producción */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4" />Estado de Producción
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-foreground font-mono">{selectedPlanta.produccion}%</span>
                    <span className="text-sm text-muted-foreground">de capacidad</span>
                  </div>
                  <Progress value={selectedPlanta.produccion} className="h-2" />
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success">+2.5% vs ayer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eficiencia */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Gauge className="h-4 w-4" />Eficiencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-foreground font-mono">{selectedPlanta.eficiencia}%</span>
                    <span className="text-sm text-muted-foreground">OEE</span>
                  </div>
                  <Progress value={selectedPlanta.eficiencia} className="h-2" />
                  <p className="text-sm text-muted-foreground">Objetivo: 95%</p>
                </div>
              </CardContent>
            </Card>

            {/* Temperatura */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />Temperatura Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className={cn("text-3xl font-bold font-mono", selectedPlanta.temperatura > 60 ? "text-destructive" : selectedPlanta.temperatura > 50 ? "text-warning" : "text-foreground")}>
                      {selectedPlanta.temperatura}°C
                    </span>
                    <span className="text-sm text-muted-foreground">Máx: 65°C</span>
                  </div>
                  <Progress value={(selectedPlanta.temperatura / 80) * 100} className={cn("h-2", selectedPlanta.temperatura > 60 && "[&>div]:bg-destructive")} />
                </div>
              </CardContent>
            </Card>

            {/* Consumo Energético */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4" />Consumo Energético
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-foreground font-mono">{selectedPlanta.consumoEnergia.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">kWh</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Consumo actual en tiempo real</p>
                </div>
              </CardContent>
            </Card>

            {/* Cronograma */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />Cronograma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Turno actual</span>
                    <span className="text-foreground font-medium">Mañana</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Próximo cambio</span>
                    <span className="text-foreground font-mono">14:00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mantenimiento</span>
                    <span className="text-foreground">En 3 días</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alarmas Activas */}
            <Card className={cn("bg-card border-border", selectedPlanta.alarmasActivas > 0 && "border-destructive/50 bg-destructive/5")}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className={cn("h-4 w-4", selectedPlanta.alarmasActivas > 0 && "text-destructive")} />
                  Alarmas Activas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-end justify-between">
                    <span className={cn("text-3xl font-bold font-mono", selectedPlanta.alarmasActivas > 0 ? "text-destructive" : "text-success")}>
                      {selectedPlanta.alarmasActivas}
                    </span>
                    <span className="text-sm text-muted-foreground">alertas</span>
                  </div>
                  {selectedPlanta.alarmasActivas > 0 ? (
                    <p className="text-sm text-destructive">Requiere atención inmediata</p>
                  ) : (
                    <p className="text-sm text-success">Todo funcionando correctamente</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorizacionSCADA;
