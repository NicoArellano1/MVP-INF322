# Features

Cada meta del usuario vive en su propia carpeta (`minuta/`, `reservas/`).

Para agregar una nueva meta sin tocar las existentes:
1. Crea `src/features/<nueva>/<Nueva>Page.tsx`.
2. Crea `src/routes/<nueva>.tsx` que solo renderice esa página.
3. Agrega una línea en `src/shared/navegacion.ts` (y su ruta al tipo `ItemNav["to"]`).
4. Si corresponde, agrega su tarjeta en `src/features/inicio/puntosEntrada.ts`.
