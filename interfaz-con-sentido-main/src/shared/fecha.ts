/** Utilidades de fecha en formato chileno (es-CL). Las fechas se manejan como "YYYY-MM-DD". */

/** Fecha "hoy" fija para que los datos de ejemplo sean coherentes en las capturas. */
export const HOY = "2026-11-02";

const DIAS_CORTOS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const DIAS_LARGOS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"];

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toISO(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export function sumarDias(iso: string, dias: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + dias);
  return toISO(d);
}

/** Lunes de la semana a la que pertenece la fecha. */
export function lunesDe(iso: string): string {
  const d = parseISO(iso);
  const dow = d.getDay();
  return sumarDias(iso, dow === 0 ? -6 : 1 - dow);
}

/** "Mié 4 nov 2026" */
export function fechaLarga(iso: string): string {
  const d = parseISO(iso);
  return `${DIAS_CORTOS[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}

/** "mié 4 nov" */
export function fechaCorta(iso: string): string {
  const d = parseISO(iso);
  return `${DIAS_CORTOS[d.getDay()].toLowerCase()} ${d.getDate()} ${MESES[d.getMonth()]}`;
}

/** { corto: "Mié", largo: "Miércoles", numero: 4 } */
export function partesDia(iso: string) {
  const d = parseISO(iso);
  return { corto: DIAS_CORTOS[d.getDay()], largo: DIAS_LARGOS[d.getDay()], numero: d.getDate() };
}

/** "2 – 6 nov 2026" para una semana lunes–viernes. */
export function rotuloSemana(lunes: string): string {
  const ini = parseISO(lunes);
  const fin = parseISO(sumarDias(lunes, 4));
  const mesIni = ini.getMonth() === fin.getMonth() ? "" : ` ${MESES[ini.getMonth()]}`;
  return `${ini.getDate()}${mesIni} – ${fin.getDate()} ${MESES[fin.getMonth()]} ${fin.getFullYear()}`;
}

/** "$3.200" */
export function clp(valor: number): string {
  return "$" + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
