import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { minutaDelDia, PRIMER_LUNES_CON_DATOS, ULTIMO_LUNES_PUBLICADO } from "@/data/minuta";
import { reservaDelDia, reservas } from "@/data/reservas";
import { Ayuda } from "@/shared/Ayuda";
import { EncabezadoPantalla } from "@/shared/EncabezadoPantalla";
import { BotonReintentar, EstadoMensaje } from "@/shared/Estados";
import { HOY, lunesDe, rotuloSemana, sumarDias } from "@/shared/fecha";
import { useCargaSimulada } from "@/shared/useCargaSimulada";
import { DetalleDia } from "./DetalleDia";
import { SelectorDias } from "./SelectorDias";

const ayuda = [
  { pregunta: "¿Cómo ver otro día?", respuesta: "Toca el día en la parte superior. También puedes usar las flechas del teclado." },
  { pregunta: "¿Cómo cambiar de semana?", respuesta: "Usa las flechas junto a las fechas de la semana." },
  { pregunta: "¿Qué significa el ✓?", respuesta: "Ese día ya tienes un almuerzo reservado." },
];

export function MinutaPage({ dia, demo }: { dia?: string; demo?: "error" }) {
  const navigate = useNavigate({ from: "/minuta" });
  const [error, setError] = useState(demo === "error");
  const seleccionado = dia ?? HOY;
  const lunes = lunesDe(seleccionado);
  const dias = useMemo(() => [0, 1, 2, 3, 4].map((i) => sumarDias(lunes, i)), [lunes]);
  const reservados = useMemo(() => new Set(reservas.filter((r) => r.estado === "Confirmada").map((r) => r.fecha)), []);
  const cargando = useCargaSimulada(seleccionado + String(error));

  const minuta = minutaDelDia(seleccionado);
  const semanaSinDatos = lunes < PRIMER_LUNES_CON_DATOS;
  const puedeSiguiente = lunes < ULTIMO_LUNES_PUBLICADO;

  const irA = (d: string) => navigate({ search: (s) => ({ ...s, dia: d }), replace: true });
  const cambiarSemana = (delta: number) => {
    const nuevo = sumarDias(lunes, 7 * delta);
    irA(nuevo <= HOY && sumarDias(nuevo, 4) >= HOY ? HOY : nuevo);
    toast(`Se muestra la semana del ${rotuloSemana(nuevo)}`);
  };

  return (
    <div>
      <EncabezadoPantalla titulo="Minuta semanal" ayuda={<Ayuda items={ayuda} />} />

      {/* Selector de semana: anterior a la izquierda, siguiente a la derecha (mapeo) */}
      <div className="mb-4 flex items-center justify-between gap-2 rounded-xl bg-muted p-1">
        <Button variant="ghost" className="h-11" onClick={() => cambiarSemana(-1)} aria-label="Semana anterior">
          <ChevronLeft aria-hidden /> <span className="hidden sm:inline">Semana anterior</span>
        </Button>
        <p className="font-semibold" aria-live="polite">
          {rotuloSemana(lunes)}
        </p>
        <Button variant="ghost" className="h-11" onClick={() => cambiarSemana(1)} disabled={!puedeSiguiente} aria-label="Semana siguiente">
          <span className="hidden sm:inline">Semana siguiente</span> <ChevronRight aria-hidden />
        </Button>
      </div>
      {!puedeSiguiente && (
        <p className="-mt-2 mb-4 text-center text-sm text-muted-foreground">La minuta de la semana siguiente se publica el viernes 13 de noviembre.</p>
      )}

      {error ? (
        <EstadoMensaje
          tipo="error"
          titulo="No se pudo cargar la minuta"
          texto="Revisa tu conexión a internet e inténtalo otra vez."
          accion={
            <BotonReintentar
              onClick={() => {
                setError(false);
                navigate({ search: (s) => ({ ...s, demo: undefined }), replace: true });
                toast.success("Minuta cargada");
              }}
            />
          }
        />
      ) : semanaSinDatos ? (
        <EstadoMensaje
          titulo="No hay minuta publicada para esta semana"
          texto="Las minutas anteriores no se conservan. Revisa la semana actual."
          accion={
            <Button size="lg" onClick={() => irA(HOY)}>
              Ver semana actual
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[15rem_1fr]">
          <SelectorDias dias={dias} seleccionado={seleccionado} reservados={reservados} onSeleccionar={irA} />
          {cargando ? (
            <div className="space-y-4 rounded-2xl border bg-card p-5" aria-busy="true" aria-label="Cargando minuta">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-72" />
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : minuta ? (
            <DetalleDia minuta={minuta} reserva={reservaDelDia(seleccionado)} />
          ) : (
            <EstadoMensaje titulo="Sin servicio este día" texto="El casino no atiende este día. Elige otro día de la semana." />
          )}
        </div>
      )}
    </div>
  );
}
