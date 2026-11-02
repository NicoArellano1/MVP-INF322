import { CalendarDays, Home, Ticket, type LucideIcon } from "lucide-react";

/**
 * Navegación Global: ÚNICA fuente de ítems de navegación.
 * Para sumar una nueva meta, crea su ruta en src/routes y agrega UNA línea aquí.
 */
export type ItemNav = { to: "/" | "/minuta" | "/reservas"; etiqueta: string; icono: LucideIcon };

export const itemsNavegacion: ItemNav[] = [
  { to: "/", etiqueta: "Inicio", icono: Home },
  { to: "/minuta", etiqueta: "Minuta", icono: CalendarDays },
  { to: "/reservas", etiqueta: "Reservas", icono: Ticket },
];
