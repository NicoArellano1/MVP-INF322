import { describe, expect, it } from "vitest";
import { proximaReserva, reservasAnteriores, reservasProximas } from "@/data/reservas";
import { clp, fechaLarga, lunesDe, rotuloSemana } from "@/shared/fecha";

describe("Reglas del casino", () => {
  it("la próxima reserva es mié 4 nov · Pastel de choclo", () => {
    const r = proximaReserva();
    expect(r?.fecha).toBe("2026-11-04");
    expect(r?.menu).toBe("Pastel de choclo");
  });
  it("hay 3 reservas próximas y 4 anteriores", () => {
    expect(reservasProximas()).toHaveLength(3);
    expect(reservasAnteriores()).toHaveLength(4);
  });
  it("formatea fechas y montos en formato chileno", () => {
    expect(fechaLarga("2026-11-04")).toBe("Mié 4 nov 2026");
    expect(clp(3200)).toBe("$3.200");
    expect(rotuloSemana(lunesDe("2026-11-05"))).toBe("2 – 6 nov 2026");
  });
});
