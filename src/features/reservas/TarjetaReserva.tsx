import { CheckCircle2, ChevronRight, CircleCheckBig, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { puedeCancelar, type EstadoReserva, type Reserva } from "@/data/reservas";
import { clp, fechaLarga } from "@/shared/fecha";

const estilosEstado: Record<EstadoReserva, { icono: typeof CheckCircle2; clase: string }> = {
  Cancelada: { icono: XCircle, clase: "bg-destructive/10 text-destructive" },
  Confirmada: { icono: CheckCircle2, clase: "bg-success-soft text-success" },
  Retirada: { icono: CircleCheckBig, clase: "bg-muted text-muted-foreground" },
  "No retirada": { icono: XCircle, clase: "bg-warning-soft text-destructive" },
};

/** Estado siempre con ícono + texto, nunca solo color. */
export function EtiquetaEstado({ estado }: { estado: EstadoReserva }) {
  const e = estilosEstado[estado];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-semibold", e.clase)}>
      <e.icono className="size-4" aria-hidden /> {estado}
    </span>
  );
}

/** Misma estructura para todas las reservas (Gestalt: similitud y proximidad). */
export function TarjetaReserva({ reserva, onAbrir, onCancelar }: { reserva: Reserva; onAbrir: () => void; onCancelar?: () => void }) {
  return (
    <article>
    <Button variant="ghost"
      onClick={onAbrir}
      aria-label={`${fechaLarga(reserva.fecha)}, ${reserva.menu}, ${reserva.estado}. Ver detalle`}
      className="h-auto whitespace-normal tap flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left shadow-card hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-lg font-bold">{fechaLarga(reserva.fecha)}</p>
          <EtiquetaEstado estado={reserva.estado} />
        </div>
        <p className="mt-1 font-medium">{reserva.menu}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {reserva.horario} · {reserva.codigo} · {clp(reserva.valor)}
        </p>
      </div>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
    </Button>
    {reserva.estado === "Confirmada" && (
      <div className="mt-2">
        {puedeCancelar(reserva) && onCancelar ? (
          <Button variant="outline" className="w-full text-destructive" onClick={onCancelar} aria-label={`Cancelar día ${reserva.codigo}`}>
            <XCircle aria-hidden /> Cancelar día
          </Button>
        ) : <p className="text-sm text-muted-foreground">No cancelable (es hoy)</p>}
      </div>
    )}
    </article>
  );
}
