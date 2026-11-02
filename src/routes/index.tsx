import { createFileRoute } from "@tanstack/react-router";
import { InicioPage } from "@/features/inicio/InicioPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casino USM · Inicio" },
      { name: "description", content: "Consulta la minuta semanal y tus reservas de almuerzo del Casino USM Casa Central." },
      { property: "og:title", content: "Casino USM · Inicio" },
      { property: "og:description", content: "Minuta semanal y reservas de almuerzo del Casino USM." },
    ],
  }),
  component: InicioPage,
});
