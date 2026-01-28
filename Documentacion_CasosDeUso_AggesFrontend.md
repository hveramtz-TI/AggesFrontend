# Documentación de Casos de Uso — AggesFrontend

## 1.0 Casos de Uso Principales

### 1.1 Autenticación de Usuario
- **Actor:** Usuario (Admin, Cliente)
- **Descripción:** El usuario ingresa sus credenciales para acceder al sistema. El sistema valida el rol y redirige al panel correspondiente.
- **Flujo principal:**
  1. El usuario accede a la pantalla de login.
  2. Ingresa usuario y contraseña.
  3. El sistema valida credenciales.
  4. Si son correctas, redirige según el rol.
  5. Si son incorrectas, muestra mensaje de error.

### 1.2 Gestión de Archivos
- **Actor:** Admin, Cliente
- **Descripción:** Permite cargar, visualizar, buscar, descargar y eliminar archivos.
- **Flujo principal:**
  1. El usuario accede a la sección de archivos.
  2. Visualiza la tabla de archivos con paginación y búsqueda.
  3. Puede cargar un nuevo archivo (si tiene permisos).
  4. Puede descargar o eliminar archivos existentes.

### 1.3 Gestión de Clientes
- **Actor:** Admin
- **Descripción:** Permite visualizar, buscar, agregar y editar clientes.
- **Flujo principal:**
  1. El admin accede a la sección de clientes.
  2. Visualiza la lista de clientes.
  3. Puede buscar, agregar o editar información de un cliente.

### 1.4 Consulta de Materiales y Servicios
- **Actor:** Usuario (Admin, Cliente)
- **Descripción:** Permite consultar catálogos de materiales y servicios, así como equivalencias y conversiones.
- **Flujo principal:**
  1. El usuario accede a la sección de materiales o servicios.
  2. Visualiza el catálogo y puede buscar o filtrar.
  3. Consulta equivalencias o conversiones si aplica.

### 1.5 Creación y Gestión de Órdenes/Reservas
- **Actor:** Cliente, Admin
- **Descripción:** Permite a los clientes crear órdenes o reservas y a los admins gestionarlas.
- **Flujo principal:**
  1. El cliente accede a la sección de órdenes/reservas.
  2. Crea una nueva orden o consulta el estado de las existentes.
  3. El admin puede cambiar el estado o gestionar las órdenes.

### 1.6 Visualización de Dashboard y Reportes
- **Actor:** Usuario (según rol)
- **Descripción:** Permite visualizar dashboards y reportes personalizados según el rol.
- **Flujo principal:**
  1. El usuario accede al dashboard.
  2. Visualiza métricas, gráficas y reportes relevantes.

### 1.7 Uso de Formularios Modales
- **Actor:** Usuario (según permisos)
- **Descripción:** Permite crear o editar entidades mediante formularios en modales.
- **Flujo principal:**
  1. El usuario selecciona una acción (crear/editar).
  2. Se abre un modal con el formulario correspondiente.
  3. El usuario completa y envía el formulario.
  4. El sistema valida y guarda los cambios.

---

**Notas:**
- Cada caso de uso puede tener flujos alternativos (errores, validaciones, permisos insuficientes).
- Para detalles de UI y lógica, consultar los componentes y hooks correspondientes en el repositorio.
