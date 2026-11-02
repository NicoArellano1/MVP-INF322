import { CalendarDays, Ticket, type LucideIcon } from "lucide-react";
import { proximaReserva, useReservas } from "@/data/reservas";
import { fechaCorta, HOY, lunesDe, rotuloSemana } from "@/shared/fecha";

/** Claros Puntos de Entrada del Inicio. Una meta nueva agrega aquí su tarjeta. */
export type PuntoEntrada = { to: "/minuta" | "/reservas"; titulo: string; subtexto: string; icono: LucideIcon };

const semana = rotuloSemana(lunesDe(HOY)).replace(" – ", " al ").replace(/ \d{4}$/, "");

export function usePuntosEntrada(): PuntoEntrada[] {
  const proxima = proximaReserva(useReservas());
  return [
  { to: "/minuta", titulo: "Consultar Minuta", subtexto: `Menú de la semana del ${semana}`, icono: CalendarDays },
  {
    to: "/reservas",
    titulo: "Mis Reservas",
    subtexto: proxima ? `Próxima: ${fechaCorta(proxima.fecha)} · ${proxima.menu}` : "No tienes reservas próximas",
    icono: Ticket,
  },
  ];
}
