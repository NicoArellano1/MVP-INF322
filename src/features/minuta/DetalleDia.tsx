import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Wallet } from "lucide-react";
import type { MinutaDia, Plato } from "@/data/minuta";
import { HORARIO_ALMUERZO, VALOR_MENU } from "@/data/minuta";
import type { Reserva } from "@/data/reservas";
import { clp, fechaLarga } from "@/shared/fecha";

function SeccionPlato({ titulo, plato, destacado }: { titulo: string; plato: Plato; destacado?: boolean }) {
  return (
    <section aria-labelledby={`t-${titulo}`} className="border-t py-4 first:border-t-0 first:pt-0">
      <h3 id={`t-${titulo}`} className="text-xs font-bold uppercase tracking-wider text-primary">
        {titulo}
      </h3>
      <p className={destacado ? "mt-1 text-xl font-bold" : "mt-1 text-lg font-semibold"}>{plato.nombre}</p>
      <p className="max-w-prose text-muted-foreground">{plato.descripcion}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {plato.etiquetas.map((e) => (
          <span key={e} className="rounded-md bg-muted px-2 py-0.5 text-sm">
            {e}
          </span>
        ))}
        {plato.kcal && <span className="text-sm text-muted-foreground">{plato.kcal} kcal</span>}
      </div>
    </section>
  );
}

export function DetalleDia({ minuta, reserva }: { minuta: MinutaDia; reserva?: Reserva }) {
  return (
    <article aria-live="polite" className="rounded-2xl border bg-card p-5 shadow-card">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold">{fechaLarga(minuta.fecha)}</h2>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden /> Almuerzo {HORARIO_ALMUERZO}
            </span>
            <span className="inline-flex items-center gap-1">
              <Wallet className="size-4" aria-hidden /> {clp(VALOR_MENU)} · Beca de alimentación disponible
            </span>
          </p>
        </div>
        {reserva && (
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-3 py-1 text-sm font-semibold text-success">
              <CheckCircle2 className="size-4" aria-hidden /> Reservado
            </span>
            <Link to="/reservas" search={{ codigo: reserva.codigo }} className="text-sm font-medium text-primary underline underline-offset-4">
              Ver en Mis Reservas
            </Link>
          </div>
        )}
      </header>
      <SeccionPlato titulo="Plato de fondo" plato={minuta.fondo} destacado />
      <SeccionPlato titulo="Vegetariano" plato={minuta.vegetariano} />
      <SeccionPlato titulo="Ensalada" plato={minuta.ensalada} />
      <SeccionPlato titulo="Postre" plato={minuta.postre} />
    </article>
  );
}
