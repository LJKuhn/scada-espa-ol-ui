import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface FormularioOrdenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orden?: OrdenProduccion | null;
  onSave: (orden: Omit<OrdenProduccion, "id">) => void;
}

const plantas = ["Planta Norte", "Planta Central", "Planta Sur", "Fábrica Este", "Fábrica Oeste"];
const productos = ["Producto A-100", "Producto B-200", "Producto C-300", "Producto D-400", "Producto E-500"];

const FormularioOrden = ({ open, onOpenChange, orden, onSave }: FormularioOrdenProps) => {
  const [form, setForm] = useState({
    producto: "",
    cantidad: "",
    fechaInicio: "",
    fechaFin: "",
    planta: "",
    estado: "pendiente" as "pendiente" | "en_proceso" | "completada",
    progreso: 0,
  });

  useEffect(() => {
    if (orden) {
      setForm({
        producto: orden.producto,
        cantidad: String(orden.cantidad),
        fechaInicio: orden.fechaInicio,
        fechaFin: orden.fechaFin,
        planta: orden.planta,
        estado: orden.estado,
        progreso: orden.progreso,
      });
    } else {
      setForm({
        producto: "",
        cantidad: "",
        fechaInicio: "",
        fechaFin: "",
        planta: "",
        estado: "pendiente",
        progreso: 0,
      });
    }
  }, [orden, open]);

  const handleSubmit = () => {
    if (!form.producto || !form.cantidad || !form.fechaInicio || !form.fechaFin || !form.planta) {
      return;
    }
    onSave({
      producto: form.producto,
      cantidad: parseInt(form.cantidad),
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      planta: form.planta,
      estado: form.estado,
      progreso: form.progreso,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{orden ? "Editar Orden" : "Nueva Orden de Producción"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Producto</Label>
            <Select value={form.producto} onValueChange={(v) => setForm({...form, producto: v})}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Seleccionar producto" />
              </SelectTrigger>
              <SelectContent>
                {productos.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cantidad (unidades)</Label>
            <Input 
              type="number"
              value={form.cantidad}
              onChange={(e) => setForm({...form, cantidad: e.target.value})}
              placeholder="5000"
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Planta</Label>
            <Select value={form.planta} onValueChange={(v) => setForm({...form, planta: v})}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Seleccionar planta" />
              </SelectTrigger>
              <SelectContent>
                {plantas.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha Inicio</Label>
              <Input 
                type="date"
                value={form.fechaInicio}
                onChange={(e) => setForm({...form, fechaInicio: e.target.value})}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha Fin</Label>
              <Input 
                type="date"
                value={form.fechaFin}
                onChange={(e) => setForm({...form, fechaFin: e.target.value})}
                className="bg-background border-border"
              />
            </div>
          </div>

          {orden && (
            <>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select value={form.estado} onValueChange={(v: "pendiente" | "en_proceso" | "completada") => setForm({...form, estado: v})}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Progreso (%)</Label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={form.progreso}
                  onChange={(e) => setForm({...form, progreso: parseInt(e.target.value) || 0})}
                  className="bg-background border-border"
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormularioOrden;
