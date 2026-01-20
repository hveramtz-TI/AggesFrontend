export const menu = [
  {
    section: "General",
    roles: [
      "admin"
    ],
    items: [
      {
        name: "Dashboard", icon: "FaHome", path: "/admin/dashboard"
      },
      {
        name: "Clientes", icon: "FaUsers", path: "/admin/clientes"
      },
      {
        name: "Archivos", icon: "FaFileAlt", path: "/admin/archivos"
      }
    ]
  },
  {
    section: "Gestión",
    roles: [
      "admin"
    ],
    items: [
      {
        name: "Gestión de Residuos", icon: "FaRecycle", path: "/admin/gestion/residuos"
      },
      {
        name: "Planificador", icon: "FaCalendarAlt", path: "/admin/gestion/planificador"
      },
      {
        name: "Trazabilidad", icon: "FaFileContract", path: "/admin/gestion/trazabilidad"
      },
      {
        name: "Inventario", icon: "FaBoxes", path: "/admin/gestion/inventario"
      },
      {
        name: "Proyectos", icon: "FaBriefcase", path: "/admin/gestion/proyectos"
      },
      {
        name: "Mapa Comunidades", icon: "FaMapMarkedAlt", path: "/admin/gestion/mapa-comunidades"
      },
      {
        name: "Puntos ReciAGGES", icon: "FaMapPin", path: "/admin/gestion/puntos-reciagges"
      }
    ]
  },
  {
    section: "General",
    roles: [
      "client"
    ],
    items: [
      {
        name: "Dashboard", icon: "FaHome", path: "/client/dashboard"
      },
      {
        name: "Cotizaciones", icon: "FaFileInvoice", path: "/client/cotizaciones"
      },
      {
        name: "Reservas", icon: "FaCalendar", path: "/client/reservas"
      },
      {
        name: "Archivos", icon: "FaFileAlt", path: "/client/archivos"
      }
    ]
  },
  {
    section: "Gestión",
    roles: [
      "client"
    ],
    items: [
      {
        name: "Gestión de Residuos", icon: "FaRecycle", path: "/client/gestion/residuos"
      },
      {
        name: "Trazabilidad", icon: "FaFileContract", path: "/client/gestion/trazabilidad"
      }
    ]
  }
];
