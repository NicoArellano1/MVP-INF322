import { useEffect, useState } from "react";

/** Simula una carga breve (~400 ms) cada vez que cambia `clave`, para dar visibilidad del estado. */
export function useCargaSimulada(clave: string, ms = 400) {
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    setCargando(true);
    const t = setTimeout(() => setCargando(false), ms);
    return () => clearTimeout(t);
  }, [clave, ms]);
  return cargando;
}
