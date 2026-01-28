# Diagrama del Modelo de Proceso de Negocio — AggesFrontend

A continuación se describe el modelo de proceso de negocio principal del sistema AggesFrontend en formato textual tipo BPMN simplificado. Puedes usar esta descripción para crear un diagrama visual en herramientas como draw.io, Lucidchart o Visio.

---

## 1.0 Proceso General de Gestión de Servicios y Archivos

### 1.1 Inicio
- Usuario accede al sistema (login)

### 1.2 Validación de Rol
- ¿Es Admin?
  - Sí: Acceso a panel de administración
  - No: Acceso a panel de cliente

### 1.3 Panel Principal (según rol)
- Admin:
  - Gestionar usuarios
  - Gestionar clientes
  - Gestionar archivos
  - Gestionar órdenes y reservas
  - Consultar reportes y dashboard
- Cliente:
  - Consultar y cargar archivos
  - Crear órdenes y reservas
  - Consultar materiales y servicios
  - Consultar dashboard

### 1.4 Subprocesos Clave

#### 1.4.1 Gestión de Archivos
- Visualizar tabla de archivos
- Buscar/filtrar archivos
- Cargar nuevo archivo
- Descargar/eliminar archivo

#### 1.4.2 Gestión de Órdenes/Reservas
- Crear nueva orden/reserva
- Consultar estado
- Admin cambia estado o gestiona

#### 1.4.3 Gestión de Clientes (solo admin)
- Visualizar lista
- Buscar/agregar/editar cliente

#### 1.4.4 Consulta de Materiales y Servicios
- Visualizar catálogos
- Consultar equivalencias/conversiones

#### 1.4.5 Reportes y Dashboard
- Visualizar métricas y reportes

### 1.5 Cierre de Sesión
- Usuario cierra sesión

---

## Notación Sugerida para Diagrama Visual
- **Rectángulo:** Actividad o tarea
- **Diamante:** Decisión (rol, validación)
- **Flechas:** Flujo de proceso
- **Subproceso:** Agrupar tareas relacionadas

---

**Notas:**
- Este modelo cubre el flujo principal y los subprocesos clave del sistema.
- Para mayor detalle, consulta los casos de uso y la estructura de carpetas del proyecto.
