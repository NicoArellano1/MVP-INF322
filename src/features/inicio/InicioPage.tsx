import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { usuario } from "@/data/usuario";
import { fechaLarga, HOY } from "@/shared/fecha";
import { HORARIO_ALMUERZO } from "@/data/minuta";
import { usePuntosEntrada } from "./puntosEntrada";

/** Concentrador (Hub and Spoke): el Inicio solo ofrece los puntos de entrada a cada meta. */
export function InicioPage() {
  const puntosEntrada = usePuntosEntrada();
  const nombre = usuario.nombre.split(" ")[0];
  return (
    <div className="mx-auto max-w-xl">
      <p className="text-muted-foreground">{fechaLarga(HOY)} · Almuerzo {HORARIO_ALMUERZO}</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight lg:text-3xl">Hola, {nombre}</h1>

      <ul className="mt-6 space-y-4">
        {puntosEntrada.map((p) => (
          <li key={p.to}>
            <Link
              to={p.to}
              className="tap group flex min-h-24 items-center gap-4 rounded-2xl border bg-card p-5 shadow-card hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <p.icono className="size-7" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold">{p.titulo}</span>
                <span className="block text-muted-foreground">{p.subtexto}</span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
