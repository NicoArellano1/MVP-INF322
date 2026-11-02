import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Clock, Ticket } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reservas as todas, reservasAnteriores, reservasProximas, type Reserva } from "@/data/reservas";
import { Ayuda } from "@/shared/Ayuda";
import { EncabezadoPantalla } from "@/shared/EncabezadoPantalla";
import { BotonReintentar, EstadoMensaje } from "@/shared/Estados";
import { fechaLarga } from "@/shared/fecha";
import { useCargaSimulada } from "@/shared/useCargaSimulada";
import { DetalleReserva } from "./DetalleReserva";
import { TarjetaReserva } from "./TarjetaReserva";

const ayuda = [
  { pregunta: "¿Cómo ver el detalle?", respuesta: "Toca una reserva para ver el menú completo y su código." },
  { pregunta: "¿Cómo retirar el almuerzo?", respuesta: "Muestra el código de la reserva en la caja del casino entre 12:30 y 15:00." },
  { pregunta: "¿Dónde están las pasadas?", respuesta: "En la pestaña «Anteriores»." },
];

/**
 * demo: "vacio" muestra el estado sin reservas próximas; "error" el estado de error.
 * Ej.: /reservas?demo=vacio
 */
export function ReservasPage({ codigo, demo }: { codigo?: string; demo?: "vacio" | "error" }) {
  const navigate = useNavigate({ from: "/reservas" });
  const [error, setError] = useState(demo === "error");
  const cargando = useCargaSimulada(String(error));

  const lista = demo === "vacio" ? todas.filter((r) => r.estado !== "Confirmada") : todas;
  const proximas = reservasProximas(lista);
  const anteriores = reservasAnteriores(lista);
  const destacada = proximas[0];
  const abierta = todas.find((r) => r.codigo === codigo);

  const abrir = (r?: Reserva) => navigate({ search: (s) => ({ ...s, codigo: r?.codigo }), replace: true });

  return (
    <div className="mx-auto max-w-2xl">
      <EncabezadoPantalla titulo="Mis reservas" ayuda={<Ayuda items={ayuda} />} />

      {error ? (
        <EstadoMensaje
          tipo="error"
          titulo="No se pudieron cargar tus reservas"
          texto="Revisa tu conexión a internet e inténtalo otra vez."
          accion={
            <BotonReintentar
              onClick={() => {
                setError(false);
                navigate({ search: (s) => ({ ...s, demo: undefined }), replace: true });
                toast.success("Reservas actualizadas");
              }}
            />
          }
        />
      ) : cargando ? (
        <div className="space-y-4" aria-busy="true" aria-label="Cargando reservas">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      ) : (
        <>
          {destacada && (
            <section aria-labelledby="proxima" className="mb-6 rounded-2xl bg-primary p-5 text-primary-foreground shadow-card">
              <h2 id="proxima" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider opacity-90">
                <Ticket className="size-4" aria-hidden /> Tu próxima reserva
              </h2>
              <p className="mt-2 text-3xl font-bold">{fechaLarga(destacada.fecha)}</p>
              <p className="mt-1 text-lg">{destacada.menu}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 opacity-90">
                  <Clock className="size-4" aria-hidden /> {destacada.horario} · {destacada.codigo}
                </span>
                <Button variant="secondary" onClick={() => abrir(destacada)}>
                  Ver detalle
                </Button>
              </div>
            </section>
          )}

          <Tabs defaultValue="proximas">
            <TabsList className="grid h-12 w-full grid-cols-2">
              <TabsTrigger value="proximas" className="h-10 text-base data-[state=active]:font-bold">
                Próximas ({proximas.length})
              </TabsTrigger>
              <TabsTrigger value="anteriores" className="h-10 text-base data-[state=active]:font-bold">
                Anteriores ({anteriores.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="proximas" className="mt-4 space-y-3">
              {proximas.length ? (
                proximas.map((r) => <TarjetaReserva key={r.codigo} reserva={r} onAbrir={() => abrir(r)} />)
              ) : (
                <EstadoMensaje
                  titulo="No tienes reservas próximas"
                  texto="Revisa la minuta de la semana para ver qué se sirve cada día."
                  accion={
                    <Button asChild size="lg">
                      <Link to="/minuta">Consultar Minuta</Link>
                    </Button>
                  }
                />
              )}
            </TabsContent>
            <TabsContent value="anteriores" className="mt-4 space-y-3">
              {anteriores.map((r) => (
                <TarjetaReserva key={r.codigo} reserva={r} onAbrir={() => abrir(r)} />
              ))}
            </TabsContent>
          </Tabs>
        </>
      )}

      <DetalleReserva reserva={cargando ? undefined : abierta} onCerrar={() => abrir(undefined)} />
    </div>
  );
}
