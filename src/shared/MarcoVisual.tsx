import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { usuario } from "@/data/usuario";
import { itemsNavegacion } from "./navegacion";

/**
 * Marco Visual: cabecera + contenido + Navegación Global.
 * Móvil: barra inferior fija. Escritorio: los mismos ítems en la cabecera (un solo mecanismo por pantalla).
 */
export function MarcoVisual({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const activo = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <div className="min-h-screen bg-background">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-card focus:p-2">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-30 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
          <Link to="/" aria-label="Casino USM, ir al Inicio" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UtensilsCrossed className="size-5" aria-hidden />
            </span>
            <span className="text-lg font-bold tracking-tight text-primary">Casino USM</span>
          </Link>

          <nav aria-label="Navegación principal" className="ml-6 hidden gap-1 lg:flex">
            {itemsNavegacion.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                aria-current={activo(i.to) ? "page" : undefined}
                className={cn(
                  "tap flex h-11 items-center gap-2 rounded-lg px-4 font-medium text-muted-foreground hover:bg-muted",
                  activo(i.to) && "bg-secondary text-primary",
                )}
              >
                <i.icono className="size-4" aria-hidden />
                {i.etiqueta}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-sm font-medium sm:inline">{usuario.nombre}</span>
            <span aria-label={usuario.nombre} role="img" className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
              {usuario.iniciales}
            </span>
          </div>
        </div>
      </header>

      <main id="contenido" className="mx-auto max-w-5xl px-4 pb-28 pt-6 lg:pb-12">
        {children}
      </main>

      <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-30 border-t bg-card lg:hidden">
        <ul className="mx-auto flex max-w-md">
          {itemsNavegacion.map((i) => (
            <li key={i.to} className="flex-1">
              <Link
                to={i.to}
                aria-current={activo(i.to) ? "page" : undefined}
                className={cn(
                  "tap flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground",
                  activo(i.to) && "text-primary",
                )}
              >
                <span className={cn("flex h-7 w-14 items-center justify-center rounded-full", activo(i.to) && "bg-secondary")}>
                  <i.icono className="size-5" aria-hidden />
                </span>
                <span className={cn(activo(i.to) && "font-bold")}>{i.etiqueta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
