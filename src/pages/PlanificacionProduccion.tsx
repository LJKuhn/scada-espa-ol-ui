import { useState } from "react";
import { Calendar, FileText, Plus, Clock, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface OrdenProduccion {
  id: string;
  producto: string;
  cantidad: number;
  fechaInicio: string;
  fechaFin: string;
  planta: string;
  estado: "pendiente" | "en_proceso" | "completada";
  progreso: number;
}

interface Plantilla {
  id: string;
  nombre: string;
  tipo: string;
  ingredientes: string;
  tiempoEstimado: string;
}

const ordenesProduccion: OrdenProduccion[] = [
  {
    id: "ORD-001",
    producto: "Producto A-100",
    cantidad: 5000,
    fechaInicio: "2024-01-15",
    fechaFin: "2024-01-18",
    planta: "Planta Norte",
    estado: "en_proceso",
    progreso: 65,
  },
  {
    id: "ORD-002",
    producto: "Producto B-200",
    cantidad: 3000,
    fechaInicio: "2024-01-16",
    fechaFin: "2024-01-19",
    planta: "Planta Central",
    estado: "pendiente",
    progreso: 0,
  },
  {
    id: "ORD-003",
    producto: "Producto C-300",
    cantidad: 8000,
    fechaInicio: "2024-01-14",
    fechaFin: "2024-01-16",
    planta: "Planta Sur",
    estado: "completada",
    progreso: 100,
  },
  {
    id: "ORD-004",
    producto: "Producto D-400",
    cantidad: 2500,
    fechaInicio: "2024-01-17",
    fechaFin: "2024-01-20",
    planta: "Fábrica Este",
    estado: "pendiente",
    progreso: 0,
  },
];

const plantillas: Plantilla[] = [
  {
    id: "REC-001",
    nombre: "Mezcla Estándar A",
    tipo: "Producción",
    ingredientes: "Componente A (45%), Componente B (30%), Aditivo X (25%)",
    tiempoEstimado: "2h 30m",
  },
  {
    id: "REC-002",
    nombre: "Fórmula Premium B",
    tipo: "Especialidad",
    ingredientes: "Base Premium (60%), Catalizador Y (20%), Estabilizador Z (20%)",
    tiempoEstimado: "3h 45m",
  },
  {
    id: "REC-003",
    nombre: "Receta Industrial C",
    tipo: "Producción",
    ingredientes: "Material Base (70%), Refuerzo R (15%), Aditivo Final (15%)",
    tiempoEstimado: "1h 15m",
  },
  {
    id: "REC-004",
    nombre: "Compuesto Especial D",
    tipo: "Especialidad",
    ingredientes: "Polímero P (50%), Agente A (25%), Modificador M (25%)",
    tiempoEstimado: "4h 00m",
  },
];

const getEstadoConfig = (estado: OrdenProduccion["estado"]) => {
  switch (estado) {
    case "completada":
      return {
        label: "Completada",
        className: "bg-success/20 text-success border-success/30",
      };
    case "en_proceso":
      return {
        label: "En Proceso",
        className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      };
    case "pendiente":
      return {
        label: "Pendiente",
        className: "bg-warning/20 text-warning border-warning/30",
      };
  }
};

const PlanificacionProduccion = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Planificación y Recetas
        </h1>
        <p className="text-muted-foreground mt-1">
          Gestiona la planificación de producción y las plantillas de recetas
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="planificacion" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="planificacion" className="gap-2">
            <Calendar className="h-4 w-4" />
            Planificación de la Producción
          </TabsTrigger>
          <TabsTrigger value="plantillas" className="gap-2">
            <FileText className="h-4 w-4" />
            Gestión de Plantillas
          </TabsTrigger>
        </TabsList>

        {/* Planificación Tab */}
        <TabsContent value="planificacion" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Órdenes</p>
                    <p className="text-2xl font-bold text-foreground">
                      {ordenesProduccion.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">En Proceso</p>
                    <p className="text-2xl font-bold text-foreground">
                      {ordenesProduccion.filter((o) => o.estado === "en_proceso").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendientes</p>
                    <p className="text-2xl font-bold text-foreground">
                      {ordenesProduccion.filter((o) => o.estado === "pendiente").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completadas</p>
                    <p className="text-2xl font-bold text-foreground">
                      {ordenesProduccion.filter((o) => o.estado === "completada").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Órdenes de Producción</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Orden
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="text-muted-foreground">ID</TableHead>
                      <TableHead className="text-muted-foreground">Producto</TableHead>
                      <TableHead className="text-muted-foreground">Cantidad</TableHead>
                      <TableHead className="text-muted-foreground">Planta</TableHead>
                      <TableHead className="text-muted-foreground">Fecha Inicio</TableHead>
                      <TableHead className="text-muted-foreground">Fecha Fin</TableHead>
                      <TableHead className="text-muted-foreground">Estado</TableHead>
                      <TableHead className="text-muted-foreground">Progreso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordenesProduccion.map((orden) => (
                      <TableRow key={orden.id}>
                        <TableCell className="font-mono text-foreground">
                          {orden.id}
                        </TableCell>
                        <TableCell className="text-foreground font-medium">
                          {orden.producto}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {orden.cantidad.toLocaleString()} uds
                        </TableCell>
                        <TableCell className="text-foreground">
                          {orden.planta}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(orden.fechaInicio).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(orden.fechaFin).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getEstadoConfig(orden.estado).className}
                          >
                            {getEstadoConfig(orden.estado).label}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-32">
                          <div className="flex items-center gap-2">
                            <Progress value={orden.progreso} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground font-mono w-10">
                              {orden.progreso}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder for planning tools */}
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Herramientas de Planificación a Largo Plazo
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Aquí se integrarán herramientas avanzadas de planificación como
                calendarios de producción, análisis de capacidad y optimización de recursos.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plantillas Tab */}
        <TabsContent value="plantillas" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Gestión de Plantillas (Recetas)</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Plantilla
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="text-muted-foreground">ID</TableHead>
                      <TableHead className="text-muted-foreground">Nombre</TableHead>
                      <TableHead className="text-muted-foreground">Tipo</TableHead>
                      <TableHead className="text-muted-foreground">Ingredientes</TableHead>
                      <TableHead className="text-muted-foreground">Tiempo Estimado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plantillas.map((plantilla) => (
                      <TableRow key={plantilla.id}>
                        <TableCell className="font-mono text-foreground">
                          {plantilla.id}
                        </TableCell>
                        <TableCell className="text-foreground font-medium">
                          {plantilla.nombre}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              plantilla.tipo === "Producción"
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            }
                          >
                            {plantilla.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-md truncate">
                          {plantilla.ingredientes}
                        </TableCell>
                        <TableCell className="font-mono text-foreground">
                          {plantilla.tiempoEstimado}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanificacionProduccion;
