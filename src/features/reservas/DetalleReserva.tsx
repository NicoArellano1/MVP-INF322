import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { minutaDelDia } from "@/data/minuta";
import type { Reserva } from "@/data/reservas";
import { clp, fechaLarga } from "@/shared/fecha";
import { EtiquetaEstado } from "./TarjetaReserva";

/** Panel Modal con Balance Diagonal: título arriba-izquierda, acción principal abajo-derecha. Máx. 2 botones. */
export function DetalleReserva({ reserva, onCerrar }: { reserva?: Reserva; onCerrar: () => void }) {
  const navigate = useNavigate();
  const minuta = reserva ? minutaDelDia(reserva.fecha) : undefined;

  return (
    <Dialog open={!!reserva} onOpenChange={(o) => !o && onCerrar()}>
      <DialogContent className="max-w-md text-left">
        {reserva && (
          <>
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl">{fechaLarga(reserva.fecha)}</DialogTitle>
              <DialogDescription>Reserva {reserva.codigo}</DialogDescription>
            </DialogHeader>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <dt className="text-muted-foreground">Menú</dt>
              <dd className="font-semibold">
                {reserva.menu} <span className="font-normal text-muted-foreground">({reserva.tipo})</span>
              </dd>
              {minuta && (
                <>
                  <dt className="text-muted-foreground">Incluye</dt>
                  <dd>
                    {minuta.ensalada.nombre} y {minuta.postre.nombre.toLowerCase()}
                  </dd>
                </>
              )}
              <dt className="text-muted-foreground">Horario</dt>
              <dd>{reserva.horario}</dd>
              <dt className="text-muted-foreground">Código</dt>
              <dd className="font-mono font-semibold tracking-wide">{reserva.codigo}</dd>
              <dt className="text-muted-foreground">Valor</dt>
              <dd>{clp(reserva.valor)}</dd>
              <dt className="text-muted-foreground">Estado</dt>
              <dd>
                <EtiquetaEstado estado={reserva.estado} />
              </dd>
            </dl>
            {reserva.estado === "Confirmada" && (
              <p className="text-sm text-muted-foreground">Muestra el código en la caja del casino para retirar tu almuerzo.</p>
            )}

            <DialogFooter className="gap-2 sm:justify-end">
              <Button variant="outline" size="lg" onClick={onCerrar}>
                Cerrar
              </Button>
              {minuta && (
                <Button size="lg" onClick={() => navigate({ to: "/minuta", search: { dia: reserva.fecha } })}>
                  Ver minuta de ese día
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
