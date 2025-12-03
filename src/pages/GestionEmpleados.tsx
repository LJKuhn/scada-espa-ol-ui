import { useState } from "react";
import TablaGestion, { Column } from "@/components/TablaGestion";
import FormularioEmpleado, { Empleado } from "@/components/FormularioEmpleado";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data
const initialEmpleados: Empleado[] = [
  {
    id: "EMP-001",
    nombre: "Carlos",
    apellido: "García López",
    nombreCompleto: "Carlos García López",
    rango: "Supervisor",
    fabricaAsignada: "Planta Norte",
    ultimoFichaje: "2024-01-15 08:30",
  },
  {
    id: "EMP-002",
    nombre: "María",
    apellido: "Rodríguez Sánchez",
    nombreCompleto: "María Rodríguez Sánchez",
    rango: "Ingeniero",
    fabricaAsignada: "Planta Central",
    ultimoFichaje: "2024-01-15 07:45",
  },
  {
    id: "EMP-003",
    nombre: "Juan",
    apellido: "Martínez Pérez",
    nombreCompleto: "Juan Martínez Pérez",
    rango: "Operario",
    fabricaAsignada: "Planta Sur",
    ultimoFichaje: "2024-01-15 06:00",
  },
  {
    id: "EMP-004",
    nombre: "Ana",
    apellido: "López Fernández",
    nombreCompleto: "Ana López Fernández",
    rango: "Técnico",
    fabricaAsignada: "Fábrica Este",
    ultimoFichaje: "2024-01-15 08:15",
  },
  {
    id: "EMP-005",
    nombre: "Pedro",
    apellido: "Sánchez Ruiz",
    nombreCompleto: "Pedro Sánchez Ruiz",
    rango: "Jefe de Planta",
    fabricaAsignada: "Planta Norte",
    ultimoFichaje: "2024-01-15 07:00",
  },
  {
    id: "EMP-006",
    nombre: "Laura",
    apellido: "González Torres",
    nombreCompleto: "Laura González Torres",
    rango: "Gerente",
    fabricaAsignada: "Planta Central",
    ultimoFichaje: "2024-01-15 09:00",
  },
  {
    id: "EMP-007",
    nombre: "Miguel",
    apellido: "Hernández Díaz",
    nombreCompleto: "Miguel Hernández Díaz",
    rango: "Operario",
    fabricaAsignada: "Fábrica Oeste",
    ultimoFichaje: "2024-01-15 06:30",
  },
  {
    id: "EMP-008",
    nombre: "Carmen",
    apellido: "Jiménez Moreno",
    nombreCompleto: "Carmen Jiménez Moreno",
    rango: "Técnico",
    fabricaAsignada: "Planta Sur",
    ultimoFichaje: "2024-01-15 07:30",
  },
];

const getRangoBadgeVariant = (rango: string) => {
  switch (rango) {
    case "Director":
    case "Gerente":
      return "default";
    case "Jefe de Planta":
    case "Supervisor":
      return "secondary";
    case "Ingeniero":
    case "Técnico":
      return "outline";
    default:
      return "outline";
  }
};

const GestionEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>(initialEmpleados);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [empleadoToDelete, setEmpleadoToDelete] = useState<Empleado | null>(null);

  const columns: Column<Empleado>[] = [
    {
      key: "id",
      header: "ID",
      className: "font-mono text-sm",
    },
    {
      key: "nombreCompleto",
      header: "Nombre Completo",
      className: "font-medium",
    },
    {
      key: "rango",
      header: "Rango",
      render: (empleado) => (
        <Badge variant={getRangoBadgeVariant(empleado.rango)}>
          {empleado.rango}
        </Badge>
      ),
    },
    {
      key: "fabricaAsignada",
      header: "Fábrica Asignada",
    },
    {
      key: "ultimoFichaje",
      header: "Último Fichaje",
      className: "text-muted-foreground text-sm",
    },
  ];

  const handleAdd = () => {
    setSelectedEmpleado(null);
    setIsFormOpen(true);
  };

  const handleEdit = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsFormOpen(true);
  };

  const handleDelete = (empleado: Empleado) => {
    setEmpleadoToDelete(empleado);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (empleadoToDelete) {
      setEmpleados((prev) => prev.filter((e) => e.id !== empleadoToDelete.id));
      toast({
        title: "Empleado eliminado",
        description: `${empleadoToDelete.nombreCompleto} ha sido eliminado correctamente.`,
      });
    }
    setDeleteDialogOpen(false);
    setEmpleadoToDelete(null);
  };

  const handleSubmit = (data: Omit<Empleado, "id" | "nombreCompleto" | "ultimoFichaje">) => {
    if (selectedEmpleado) {
      // Edit existing
      setEmpleados((prev) =>
        prev.map((e) =>
          e.id === selectedEmpleado.id
            ? {
                ...e,
                ...data,
                nombreCompleto: `${data.nombre} ${data.apellido}`,
              }
            : e
        )
      );
      toast({
        title: "Empleado actualizado",
        description: `Los datos de ${data.nombre} ${data.apellido} han sido actualizados.`,
      });
    } else {
      // Add new
      const newEmpleado: Empleado = {
        id: `EMP-${String(empleados.length + 1).padStart(3, "0")}`,
        ...data,
        nombreCompleto: `${data.nombre} ${data.apellido}`,
        ultimoFichaje: new Date().toLocaleString("es-ES"),
      };
      setEmpleados((prev) => [...prev, newEmpleado]);
      toast({
        title: "Empleado añadido",
        description: `${data.nombre} ${data.apellido} ha sido añadido al sistema.`,
      });
    }
  };

  return (
    <div>
      <TablaGestion
        title="Gestión de Empleados"
        subtitle="Administra el personal de todas las plantas y fábricas"
        data={empleados}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Buscar empleados..."
        addButtonLabel="Añadir Empleado"
      />

      <FormularioEmpleado
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        empleado={selectedEmpleado}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar empleado?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente a{" "}
              <span className="font-medium text-foreground">
                {empleadoToDelete?.nombreCompleto}
              </span>{" "}
              del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GestionEmpleados;
