import { HelpCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/** Ayuda contextual breve, orientada a tareas (Heurística 10). */
export function Ayuda({ items }: { items: { pregunta: string; respuesta: string }[] }) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="Ayuda"
        className="tap inline-flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <HelpCircle className="size-5" aria-hidden />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-3">
        {items.map((i) => (
          <div key={i.pregunta}>
            <p className="text-sm font-semibold">{i.pregunta}</p>
            <p className="text-sm text-muted-foreground">{i.respuesta}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
