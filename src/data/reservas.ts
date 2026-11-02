import { HOY } from "@/shared/fecha";

export type EstadoReserva = "Confirmada" | "Retirada" | "No retirada";

export type Reserva = {
  codigo: string;
  fecha: string; // YYYY-MM-DD
  tipo: "Plato de fondo" | "Vegetariano";
  menu: string;
  horario: string;
  valor: number;
  estado: EstadoReserva;
};

export const reservas: Reserva[] = [
  { codigo: "RES-2048", fecha: "2026-11-04", tipo: "Plato de fondo", menu: "Pastel de choclo", horario: "12:30 – 15:00", valor: 3200, estado: "Confirmada" },
  { codigo: "RES-2063", fecha: "2026-11-06", tipo: "Vegetariano", menu: "Tortilla de acelga con arroz primavera", horario: "12:30 – 15:00", valor: 3200, estado: "Confirmada" },
  { codigo: "RES-2091", fecha: "2026-11-10", tipo: "Plato de fondo", menu: "Tallarines con salsa boloñesa", horario: "12:30 – 15:00", valor: 3200, estado: "Confirmada" },
  { codigo: "RES-1987", fecha: "2026-10-30", tipo: "Plato de fondo", menu: "Pescado frito con papas cocidas", horario: "12:30 – 15:00", valor: 3200, estado: "Retirada" },
  { codigo: "RES-1972", fecha: "2026-10-28", tipo: "Vegetariano", menu: "Hamburguesa de lentejas con arroz", horario: "12:30 – 15:00", valor: 3200, estado: "No retirada" },
  { codigo: "RES-1955", fecha: "2026-10-27", tipo: "Plato de fondo", menu: "Carbonada de vacuno", horario: "12:30 – 15:00", valor: 3200, estado: "Retirada" },
  { codigo: "RES-1940", fecha: "2026-10-26", tipo: "Plato de fondo", menu: "Porotos con riendas", horario: "12:30 – 15:00", valor: 3200, estado: "Retirada" },
];

/** Reservas desde hoy en adelante, de la más cercana a la más lejana. */
export function reservasProximas(lista: Reserva[] = reservas): Reserva[] {
  return lista.filter((r) => r.fecha >= HOY).sort((a, b) => a.fecha.localeCompare(b.fecha));
}

/** Reservas pasadas, de la más reciente a la más antigua. */
export function reservasAnteriores(lista: Reserva[] = reservas): Reserva[] {
  return lista.filter((r) => r.fecha < HOY).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function proximaReserva(lista: Reserva[] = reservas): Reserva | undefined {
  return reservasProximas(lista)[0];
}

export function reservaDelDia(fecha: string): Reserva | undefined {
  return reservas.find((r) => r.fecha === fecha && r.estado === "Confirmada");
}
