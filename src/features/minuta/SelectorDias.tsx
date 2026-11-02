import { useRef, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOY, partesDia } from "@/shared/fecha";

/**
 * Chips de días (móvil) / lista lateral (escritorio, Selección en Dos Paneles).
 * Mapeo: orden izquierda→derecha = calendario. Teclado: flechas, Inicio/Fin.
 */
export function SelectorDias({
  dias,
  seleccionado,
  reservados,
  onSeleccionar,
}: {
  dias: string[];
  seleccionado: string;
  reservados: Set<string>;
  onSeleccionar: (d: string) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, idx: number) => {
    let n = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = Math.min(dias.length - 1, idx + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = Math.max(0, idx - 1);
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = dias.length - 1;
    else return;
    e.preventDefault();
    onSeleccionar(dias[n]);
    refs.current[n]?.focus();
  };

  return (
    <div role="radiogroup" aria-label="Día de la semana" className="grid grid-cols-5 gap-2 lg:grid-cols-1">
      {dias.map((d, idx) => {
        const p = partesDia(d);
        const activo = d === seleccionado;
        const hoy = d === HOY;
        return (
          <button
            key={d}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            role="radio"
            aria-checked={activo}
            aria-label={`${p.largo} ${p.numero}${hoy ? ", hoy" : ""}${reservados.has(d) ? ", reservado" : ""}`}
            tabIndex={activo ? 0 : -1}
            onClick={() => onSeleccionar(d)}
            onKeyDown={(e) => onKey(e, idx)}
            className={cn(
              "tap relative flex min-h-16 flex-col items-center justify-center rounded-xl border-2 bg-card px-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:flex-row lg:justify-start lg:gap-3 lg:px-4",
              activo ? "border-primary bg-primary text-primary-foreground shadow-card" : "border-transparent hover:border-border",
            )}
          >
            <span className="text-sm font-medium lg:hidden">{p.corto}</span>
            <span className="hidden font-medium lg:inline">{p.largo}</span>
            <span className="text-xl font-bold lg:text-base">{p.numero}</span>
            {hoy && (
              <span className={cn("text-[0.7rem] font-semibold uppercase leading-none lg:ml-auto lg:text-xs", activo ? "text-primary-foreground" : "text-primary")}>
                Hoy
              </span>
            )}
            {reservados.has(d) && (
              <Check
                className={cn("absolute right-1 top-1 size-4 lg:static lg:ml-auto", hoy && "lg:ml-2", activo ? "text-primary-foreground" : "text-success")}
                aria-hidden
              />
            )}
            {activo && <span className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-accent lg:hidden" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}
