import { Activity, Settings, Play, Pause, RotateCcw, Info, Maximize2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ScadaFlowDiagram from "@/components/scada/ScadaFlowDiagram";

const VisualizacionSCADA = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Visualización SCADA
          </h1>
          <p className="text-muted-foreground mt-1">
            Diagrama de proceso en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-success/20 text-success border-success/30">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Conectado
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Diagram Area */}
        <div className="xl:col-span-3 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Diagrama de Proceso en Tiempo Real
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Actualizar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Dynamic SCADA Flow Diagram */}
              <ScadaFlowDiagram />
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary" />
                  <span>Tanques</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-success" />
                  <span>Bombas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-warning" />
                  <span>Válvulas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-info" />
                  <span>Mezcladores</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span>Sensores</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Controls */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Estado del Proceso:
                  </span>
                  <Badge className={isRunning ? "bg-success/20 text-success border-success/30" : "bg-muted text-muted-foreground"}>
                    {isRunning ? "En Ejecución" : "Detenido"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsRunning(false)}
                    disabled={!isRunning}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Iniciar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Panel */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Tabs defaultValue="receta" className="w-full">
                <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-border bg-transparent h-auto p-0">
                  <TabsTrigger
                    value="receta"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                  >
                    Receta Activa
                  </TabsTrigger>
                  <TabsTrigger
                    value="controles"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                  >
                    Controles
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="receta" className="p-4 mt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">
                        Producto Actual
                      </h4>
                      <p className="text-lg font-semibold text-primary mt-1">
                        Lote A-2024-0156
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Receta</span>
                        <span className="text-foreground">REC-001</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fase</span>
                        <span className="text-foreground">Mezclado</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso</span>
                        <span className="text-foreground font-mono">67%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tiempo Est.</span>
                        <span className="text-foreground font-mono">1h 23m</span>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Ingredientes
                      </h5>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Componente A</span>
                          <span className="text-foreground">45kg</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Componente B</span>
                          <span className="text-foreground">28kg</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Aditivo X</span>
                          <span className="text-foreground">2.5kg</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="controles" className="p-4 mt-0">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-foreground">
                      Controles Manuales
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground">Válvula V1</span>
                          <Badge variant="outline" className="text-xs">
                            Abierta
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Cerrar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Auto
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground">Bomba P1</span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-success/20 text-success"
                          >
                            Activa
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Detener
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Auto
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground">Motor M2</span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-warning/20 text-warning"
                          >
                            Manual
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Iniciar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Auto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VisualizacionSCADA;
