import type { ReactNode } from "react";
import { AlertTriangle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Estado vacío / error con mensaje llano y acción concreta (Heurísticas 1 y 9). */
export function EstadoMensaje({
  tipo = "vacio",
  titulo,
  texto,
  accion,
}: {
  tipo?: "vacio" | "error";
  titulo: string;
  texto: string;
  accion?: ReactNode;
}) {
  const Icono = tipo === "error" ? AlertTriangle : Inbox;
  return (
    <div
      role={tipo === "error" ? "alert" : "status"}
      className="flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-10 text-center"
    >
      <Icono className={tipo === "error" ? "size-8 text-destructive" : "size-8 text-muted-foreground"} aria-hidden />
      <h2 className="mt-3 text-lg font-semibold">{titulo}</h2>
      <p className="mt-1 max-w-prose text-muted-foreground">{texto}</p>
      {accion && <div className="mt-5">{accion}</div>}
    </div>
  );
}

export function BotonReintentar({ onClick }: { onClick: () => void }) {
  return (
    <Button size="lg" onClick={onClick}>
      Volver a intentar
    </Button>
  );
}
