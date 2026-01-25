
# Copilot Instructions for AggesFrontend

## Uso de documentación Context7
- Siempre que sea necesario consultar documentación de Next.js, TailwindCSS o TypeScript, utiliza Context7 para obtener información precisa y actualizada.
- Prioriza el uso de Context7 para resolver dudas sobre APIs, configuración, hooks, estilos y tipados relacionados con estas tecnologías.

## Arquitectura y Estructura General
- Proyecto basado en Next.js (app directory, rutas segmentadas por roles y áreas).
- Estructura modular: cada dominio (usuarios, documentos, materiales, etc.) tiene su propio subdirectorio bajo `api/`.
- Las vistas principales están en `app/`, segmentadas por roles (`admin`, `client`, `auth`, `landing`).
- Componentes reutilizables en `components/` y subcarpetas especializadas (`landing/`, `common/`).
- Datos de ejemplo y catálogos en `data/` (JSON y TypeScript).
- Hooks personalizados en `hooks/` para lógica de negocio y acceso a datos.

## Flujos de Desarrollo
- **Desarrollo local:**
  - Usa `npm run dev` (o `yarn dev`, `pnpm dev`, `bun dev`) en la raíz de `agges/`.
  - El entrypoint principal es `app/(landing)/page.tsx` para la landing y `app/admin/`, `app/client/` para paneles.
- **Estilos:**
  - TailwindCSS configurado en `tailwind.config.js` y `postcss.config.mjs`.
  - Estilos globales en `app/globals.css`.
- **Configuración:**
  - Configuración de TypeScript en `tsconfig.json`.
  - Configuración de ESLint en `eslint.config.mjs`.
- **API y Modelos:**
  - Endpoints y modelos de dominio en `api/{dominio}/`.
  - Usa `client.ts` para llamadas centralizadas a la API.

## Convenciones Específicas
- **Rutas protegidas:** Usa el componente `ProtectedRoute` para restringir acceso según rol.
- **Componentes de tabla y formularios:**
  - Ejemplo: `ClientesTable.tsx`, `ArchivoFormModal.tsx`.
- **Carga y estados:**
  - Usa componentes `loading.tsx` y `Spinner.tsx` para estados de carga.
- **Paginación y búsqueda:**
  - Componentes reutilizables en `components/common/`.
- **Datos mock:**
  - Utiliza archivos en `data/` para desarrollo sin backend.

## Integraciones y Dependencias
- Next.js, React, TailwindCSS, ESLint, PostCSS.
- No se detectan integraciones externas complejas ni microservicios.

## Ejemplos de Patrones
- Para agregar un nuevo dominio (ej. "productos"):
  1. Crea carpeta en `api/productos/` con `index.ts`, `models.ts`, `urls.ts`.
  2. Agrega vistas en `app/admin/productos/` y/o `app/client/productos/`.
  3. Crea hooks en `hooks/useProductos.ts` si es necesario.

## Archivos Clave
- `agges/app/` — Vistas y rutas principales.
- `agges/api/` — Lógica de acceso a datos y modelos.
- `agges/components/` — Componentes UI reutilizables.
- `agges/data/` — Datos de ejemplo y catálogos.
- `agges/hooks/` — Hooks personalizados.

---

Actualiza este archivo si cambian las convenciones o la estructura. Consulta los README para detalles adicionales.
