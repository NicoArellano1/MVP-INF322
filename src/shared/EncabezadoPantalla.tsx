import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

/** Título de pantalla + Escotilla de Escape ("Volver al Inicio") + ayuda opcional. */
export function EncabezadoPantalla({ titulo, ayuda }: { titulo: string; ayuda?: ReactNode }) {
  return (
    <div className="mb-5">
      <Link
        to="/"
        className="tap -ml-2 inline-flex h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-4" aria-hidden /> Volver al Inicio
      </Link>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{titulo}</h1>
        {ayuda}
      </div>
    </div>
  );
}
