import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface Plantilla {
  id: string;
  nombre: string;
  tipo: string;
  ingredientes: string;
  tiempoEstimado: string;
}

interface FormularioPlantillaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plantilla?: Plantilla | null;
  onSave: (plantilla: Omit<Plantilla, "id">) => void;
}

const tipos = ["Producción", "Especialidad", "Mantenimiento", "Calibración"];

const FormularioPlantilla = ({ open, onOpenChange, plantilla, onSave }: FormularioPlantillaProps) => {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    ingredientes: "",
    tiempoEstimado: "",
  });

  useEffect(() => {
    if (plantilla) {
      setForm({
        nombre: plantilla.nombre,
        tipo: plantilla.tipo,
        ingredientes: plantilla.ingredientes,
        tiempoEstimado: plantilla.tiempoEstimado,
      });
    } else {
      setForm({
        nombre: "",
        tipo: "",
        ingredientes: "",
        tiempoEstimado: "",
      });
    }
  }, [plantilla, open]);

  const handleSubmit = () => {
    if (!form.nombre || !form.tipo || !form.ingredientes || !form.tiempoEstimado) {
      return;
    }
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{plantilla ? "Editar Plantilla" : "Nueva Plantilla"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input 
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              placeholder="Nombre de la plantilla"
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={form.tipo} onValueChange={(v) => setForm({...form, tipo: v})}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tipos.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ingredientes / Componentes</Label>
            <Textarea 
              value={form.ingredientes}
              onChange={(e) => setForm({...form, ingredientes: e.target.value})}
              placeholder="Componente A (45%), Componente B (30%), Aditivo X (25%)"
              className="bg-background border-border"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tiempo Estimado</Label>
            <Input 
              value={form.tiempoEstimado}
              onChange={(e) => setForm({...form, tiempoEstimado: e.target.value})}
              placeholder="2h 30m"
              className="bg-background border-border"
            />
          </div>
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

export default FormularioPlantilla;
