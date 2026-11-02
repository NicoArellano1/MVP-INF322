import { createFileRoute } from "@tanstack/react-router";
import { ReservasPage } from "@/features/reservas/ReservasPage";

type Busqueda = { codigo?: string; demo?: "vacio" | "error" };

export const Route = createFileRoute("/reservas")({
  validateSearch: (s: Record<string, unknown>): Busqueda => ({
    codigo: typeof s.codigo === "string" ? s.codigo : undefined,
    demo: s.demo === "vacio" || s.demo === "error" ? s.demo : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Mis reservas · Casino USM" },
      { name: "description", content: "Revisa la fecha, el menú y el código de tus reservas de almuerzo." },
      { property: "og:title", content: "Mis reservas · Casino USM" },
      { property: "og:description", content: "Tus reservas de almuerzo en el Casino USM Casa Central." },
    ],
  }),
  component: ReservasRoute,
});

function ReservasRoute() {
  const { codigo, demo } = Route.useSearch();
  return <ReservasPage codigo={codigo} demo={demo} />;
}
