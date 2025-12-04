import { Activity, Settings, Play, Pause, RotateCcw, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const VisualizacionSCADA = () => {
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
            <div className="status-dot status-dot-operational mr-2" />
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
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Actualizar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Diagram Placeholder */}
              <div className="relative w-full h-[500px] rounded-lg bg-background/50 border border-dashed border-border flex flex-col items-center justify-center">
                {/* Simulated Process Flow */}
                <div className="absolute inset-4 grid grid-cols-5 gap-4 opacity-30">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-primary/20 bg-primary/5"
                    />
                  ))}
                </div>
                
                {/* Center Content */}
                <div className="relative z-10 text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-10 w-10 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Área de Diagrama Dinámico
                    </h3>
                    <p className="text-muted-foreground max-w-md">
                      Aquí se visualizará el diagrama de proceso interactivo con
                      los flujos de producción, sensores y estados de las máquinas.
                    </p>
                  </div>
                  <Badge variant="secondary" className="gap-2">
                    <Info className="h-3 w-3" />
                    Integración D3.js/JointJS para el diagrama dinámico
                  </Badge>
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
                  <Badge className="bg-success/20 text-success border-success/30">
                    En Ejecución
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar
                  </Button>
                  <Button size="sm">
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
