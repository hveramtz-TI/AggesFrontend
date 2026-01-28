# AggesFrontend

Frontend del sistema Agges para la gestión de servicios ambientales, archivos, órdenes y clientes. Proyecto desarrollado con Next.js, React, TypeScript y TailwindCSS.

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Desarrollo Local](#instalación-y-desarrollo-local)
- [Convenciones y Buenas Prácticas](#convenciones-y-buenas-prácticas)
- [Flujo de Negocio](#flujo-de-negocio)
- [Casos de Uso](#casos-de-uso)

---

## Descripción General
AggesFrontend es una aplicación modular para la gestión de servicios ambientales, orientada a empresas y clientes. Permite la administración de usuarios, archivos, órdenes, clientes, materiales, servicios y reportes, con interfaces diferenciadas por rol (admin/cliente).

## Estructura del Proyecto

```
agges/
  app/                # Vistas principales segmentadas por rol y área
  api/                # Lógica de acceso a datos y modelos de dominio
  components/         # Componentes UI reutilizables
  data/               # Datos de ejemplo y catálogos
  hooks/              # Hooks personalizados
  layout/             # Layouts principales
  public/             # Recursos estáticos
  types/              # Tipos globales
  utils/              # Utilidades y helpers
```

## Instalación y Desarrollo Local

1. Clona el repositorio:
	```bash
	git clone https://github.com/hveramtz-TI/AggesFrontend.git
	```
2. Instala dependencias:
	```bash
	cd agges
	npm install
	# o yarn install / pnpm install / bun install
	```
3. Inicia el entorno de desarrollo:
	```bash
	npm run dev
	# o yarn dev / pnpm dev / bun dev
	```
4. Accede a la app en `http://localhost:3000`

## Convenciones y Buenas Prácticas
- **Tecnologías:** Next.js (app directory), React, TypeScript, TailwindCSS.
- **Modularidad:** Cada dominio (usuarios, archivos, materiales, etc.) tiene su propio subdirectorio bajo `api/`.
- **Roles:** Vistas segmentadas por rol (`admin`, `client`, `auth`, `landing`).
- **Componentes:** Reutilizables y desacoplados, ubicados en `components/`.
- **Hooks:** Lógica de negocio y acceso a datos en `hooks/`.
- **Estilos:** TailwindCSS, configuración en `tailwind.config.js` y estilos globales en `app/globals.css`.
- **Rutas protegidas:** Usa `ProtectedRoute` para control de acceso.
- **Datos mock:** Archivos en `data/` para desarrollo sin backend.
- **Iconografía:** Usa `react-icons` importando solo los íconos necesarios.

## Flujo de Negocio
El flujo principal del sistema es:
1. Login y validación de rol (admin/cliente).
2. Acceso a panel principal según rol.
3. Subprocesos clave:
	- Gestión de archivos (cargar, buscar, descargar, eliminar)
	- Gestión de órdenes y reservas
	- Gestión de clientes (solo admin)
	- Consulta de materiales y servicios
	- Visualización de reportes y dashboard
4. Cierre de sesión

Para más detalle, consulta el archivo `Diagrama_ProcesoNegocio_AggesFrontend.md`.

## Casos de Uso
- Autenticación de usuario
- Gestión de archivos
- Gestión de clientes
- Consulta de materiales y servicios
- Creación y gestión de órdenes/reservas
- Visualización de dashboard y reportes
- Formularios modales para creación/edición

Ver detalles en `Documentacion_CasosDeUso_AggesFrontend.md`.

## Requerimientos
Consulta `Documentacion_Requerimientos_AggesFrontend.md` para requerimientos funcionales y no funcionales.

---

### Notas
- El proyecto está en desarrollo activo.
- Actualiza este README si cambian las convenciones o estructura.

