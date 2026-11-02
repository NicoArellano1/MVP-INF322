import { createFileRoute } from "@tanstack/react-router";
import { MinutaPage } from "@/features/minuta/MinutaPage";

type Busqueda = { dia?: string; demo?: "error" };

export const Route = createFileRoute("/minuta")({
  validateSearch: (s: Record<string, unknown>): Busqueda => ({
    dia: typeof s.dia === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.dia) ? s.dia : undefined,
    demo: s.demo === "error" ? "error" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Minuta semanal · Casino USM" },
      { name: "description", content: "Menú del día del Casino USM: plato de fondo, vegetariano, ensalada y postre." },
      { property: "og:title", content: "Minuta semanal · Casino USM" },
      { property: "og:description", content: "Revisa qué se sirve cada día en el Casino USM Casa Central." },
    ],
  }),
  component: MinutaRoute,
});

function MinutaRoute() {
  const { dia, demo } = Route.useSearch();
  return <MinutaPage dia={dia} demo={demo} />;
}
