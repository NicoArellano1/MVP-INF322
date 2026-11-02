/** Minuta de ejemplo — Casino USM Casa Central, Valparaíso. */

export type Plato = {
  nombre: string;
  descripcion: string;
  etiquetas: string[];
  kcal?: number;
};

export type MinutaDia = {
  fecha: string; // YYYY-MM-DD
  fondo: Plato;
  vegetariano: Plato;
  ensalada: Plato;
  postre: Plato;
};

export const HORARIO_ALMUERZO = "12:30 – 15:00";
export const VALOR_MENU = 3200;

const ensaladaChilena: Plato = {
  nombre: "Ensalada chilena",
  descripcion: "Tomate, cebolla en pluma y cilantro.",
  etiquetas: ["Vegano", "Sin gluten"],
  kcal: 90,
};
const ensaladaSurtida: Plato = {
  nombre: "Ensalada surtida",
  descripcion: "Lechuga, zanahoria rallada, betarraga y choclo.",
  etiquetas: ["Vegano", "Sin gluten"],
  kcal: 110,
};

export const minutas: MinutaDia[] = [
  {
    fecha: "2026-11-02",
    fondo: { nombre: "Cazuela de vacuno", descripcion: "Con papa, zapallo, choclo y arroz.", etiquetas: ["Sin lactosa"], kcal: 620 },
    vegetariano: { nombre: "Cazuela de verduras", descripcion: "Caldo de verduras con zapallo, papa y porotos verdes.", etiquetas: ["Vegano", "Sin gluten"], kcal: 430 },
    ensalada: ensaladaChilena,
    postre: { nombre: "Fruta de la estación", descripcion: "Naranja o plátano.", etiquetas: ["Vegano"], kcal: 80 },
  },
  {
    fecha: "2026-11-03",
    fondo: { nombre: "Pollo asado con puré rústico", descripcion: "Trutro asado al horno y puré con cáscara.", etiquetas: ["Contiene lactosa"], kcal: 710 },
    vegetariano: { nombre: "Hamburguesa de lentejas", descripcion: "Con puré rústico y salsa de yogur.", etiquetas: ["Contiene gluten", "Contiene lactosa"], kcal: 560 },
    ensalada: ensaladaSurtida,
    postre: { nombre: "Gelatina de frambuesa", descripcion: "Porción individual.", etiquetas: ["Sin gluten"], kcal: 70 },
  },
  {
    fecha: "2026-11-04",
    fondo: { nombre: "Pastel de choclo", descripcion: "Pino de vacuno, pollo, huevo y aceituna, gratinado.", etiquetas: ["Contiene huevo", "Contiene lactosa"], kcal: 780 },
    vegetariano: { nombre: "Pastel de choclo vegetariano", descripcion: "Pino de soya y champiñones.", etiquetas: ["Contiene soya", "Contiene lactosa"], kcal: 640 },
    ensalada: ensaladaChilena,
    postre: { nombre: "Leche asada", descripcion: "Con caramelo.", etiquetas: ["Contiene huevo", "Contiene lactosa"], kcal: 210 },
  },
  {
    fecha: "2026-11-05",
    fondo: { nombre: "Porotos granados con mazamorra", descripcion: "Con albahaca y zapallo, acompañados de longaniza.", etiquetas: ["Sin lactosa"], kcal: 650 },
    vegetariano: { nombre: "Porotos granados con mazamorra", descripcion: "Misma preparación, sin longaniza.", etiquetas: ["Vegano", "Sin lactosa"], kcal: 520 },
    ensalada: ensaladaSurtida,
    postre: { nombre: "Fruta de la estación", descripcion: "Manzana o pera.", etiquetas: ["Vegano"], kcal: 80 },
  },
  {
    fecha: "2026-11-06",
    fondo: { nombre: "Merluza frita con arroz primavera", descripcion: "Filete apanado y arroz con arvejas y zanahoria.", etiquetas: ["Contiene gluten", "Contiene pescado"], kcal: 690 },
    vegetariano: { nombre: "Tortilla de acelga con arroz primavera", descripcion: "Tortilla al horno.", etiquetas: ["Contiene huevo"], kcal: 480 },
    ensalada: ensaladaChilena,
    postre: { nombre: "Jalea con fruta", descripcion: "Jalea de piña con trozos de durazno.", etiquetas: ["Sin gluten"], kcal: 90 },
  },
  {
    fecha: "2026-11-09",
    fondo: { nombre: "Lentejas con arroz", descripcion: "Guiso con zapallo y longaniza.", etiquetas: ["Sin lactosa"], kcal: 600 },
    vegetariano: { nombre: "Lentejas con arroz", descripcion: "Guiso con zapallo y pimentón.", etiquetas: ["Vegano"], kcal: 510 },
    ensalada: ensaladaSurtida,
    postre: { nombre: "Fruta de la estación", descripcion: "Naranja o plátano.", etiquetas: ["Vegano"], kcal: 80 },
  },
  {
    fecha: "2026-11-10",
    fondo: { nombre: "Tallarines con salsa boloñesa", descripcion: "Con queso rallado.", etiquetas: ["Contiene gluten", "Contiene lactosa"], kcal: 720 },
    vegetariano: { nombre: "Tallarines al pesto", descripcion: "Pesto de albahaca y nueces.", etiquetas: ["Contiene gluten", "Contiene frutos secos"], kcal: 640 },
    ensalada: ensaladaChilena,
    postre: { nombre: "Leche asada", descripcion: "Con caramelo.", etiquetas: ["Contiene huevo", "Contiene lactosa"], kcal: 210 },
  },
  {
    fecha: "2026-11-11",
    fondo: { nombre: "Charquicán con huevo frito", descripcion: "Papa, zapallo, choclo y carne molida.", etiquetas: ["Contiene huevo"], kcal: 680 },
    vegetariano: { nombre: "Charquicán de verduras", descripcion: "Con huevo frito.", etiquetas: ["Contiene huevo", "Sin gluten"], kcal: 540 },
    ensalada: ensaladaSurtida,
    postre: { nombre: "Gelatina de piña", descripcion: "Porción individual.", etiquetas: ["Sin gluten"], kcal: 70 },
  },
  {
    fecha: "2026-11-12",
    fondo: { nombre: "Pollo arvejado con arroz", descripcion: "Pollo guisado con arvejas y zanahoria.", etiquetas: ["Sin lactosa"], kcal: 640 },
    vegetariano: { nombre: "Hamburguesa de lentejas con arroz", descripcion: "Con salsa de tomate casera.", etiquetas: ["Contiene gluten"], kcal: 560 },
    ensalada: ensaladaChilena,
    postre: { nombre: "Fruta de la estación", descripcion: "Manzana o pera.", etiquetas: ["Vegano"], kcal: 80 },
  },
  {
    fecha: "2026-11-13",
    fondo: { nombre: "Merluza al horno con puré", descripcion: "Con salsa de limón.", etiquetas: ["Contiene pescado", "Contiene lactosa"], kcal: 590 },
    vegetariano: { nombre: "Budín de zapallo italiano", descripcion: "Gratinado, con puré.", etiquetas: ["Contiene huevo", "Contiene lactosa"], kcal: 500 },
    ensalada: ensaladaSurtida,
    postre: { nombre: "Leche nevada", descripcion: "Con merengue.", etiquetas: ["Contiene huevo", "Contiene lactosa"], kcal: 230 },
  },
];

/** Primer y último lunes con minuta publicada. */
export const PRIMER_LUNES_CON_DATOS = "2026-11-02";
export const ULTIMO_LUNES_PUBLICADO = "2026-11-09";

export function minutaDelDia(fecha: string): MinutaDia | undefined {
  return minutas.find((m) => m.fecha === fecha);
}
