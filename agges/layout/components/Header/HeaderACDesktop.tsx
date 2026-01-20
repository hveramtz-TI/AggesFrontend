import React, { useState } from 'react'
import Link from 'next/link'
import { menu } from '@/data/menu'
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaFileInvoice,
  FaRecycle,
  FaCalendarAlt,
  FaFileContract,
  FaBoxes,
  FaBriefcase,
  FaMapMarkedAlt,
  FaMapPin,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa6';

interface HeaderACDesktopProps {
  isActive: (path: string) => boolean;
  logout: () => void;
  userType: number; // 1 = admin, 0 = cliente
}

// Mapeo de iconos string a componentes
const iconMap: Record<string, React.ReactNode> = {
  FaHome: <FaHome size={20} />,
  FaUsers: <FaUsers size={20} />,
  FaFileAlt: <FaFileAlt size={20} />,
  FaFileInvoice: <FaFileInvoice size={20} />,
  FaRecycle: <FaRecycle size={20} />,
  FaCalendarAlt: <FaCalendarAlt size={20} />,
  FaFileContract: <FaFileContract size={20} />,
  FaBoxes: <FaBoxes size={20} />,
  FaBriefcase: <FaBriefcase size={20} />,
  FaMapMarkedAlt: <FaMapMarkedAlt size={20} />,
  FaMapPin: <FaMapPin size={20} />,
  FaCalendar: <FaCalendar size={20} />,
};

// Define the type for menu items
interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface MenuSection {
  section: string;
  roles: string[];
  items: MenuItem[];
}

const HeaderACDesktop = ({ isActive, logout, userType }: HeaderACDesktopProps) => {
  const role = userType === 1 ? 'admin' : 'client';
  const filteredMenu = (menu as MenuSection[]).filter((section) => section.roles.includes(role));

  // Estado para secciones expandidas (por defecto todas abiertas para facilitar acceso inicial)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    filteredMenu.reduce((acc, section) => ({ ...acc, [section.section]: true }), {})
  );

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="fixed min-h-screen items-center bg-(--color-dark-gray) shadow-[0_2px_4px_rgba(0,0,0,0.2)] max-md:hidden overflow-y-auto">
      <div className='flex items-center content-center flex-col pt-8 pb-10 px-5 gap-6 min-h-screen'>
        <span className="text-white font-medium text-lg">{userType === 1 ? 'Administrador' : 'Cliente'}</span>
        <hr className="border-white opacity-10 w-full" />

        <nav className="flex flex-col gap-4 w-full">
          {filteredMenu.map((section) => {
            const isExpanded = expandedSections[section.section];
            return (
              <div key={section.section} className="flex flex-col gap-2">
                <button
                  onClick={() => toggleSection(section.section)}
                  className="flex items-center justify-between w-full text-gray-400 hover:text-white transition-colors py-1 px-2 focus:outline-none bg-transparent border-none cursor-pointer"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black">
                    {section.section}
                  </span>
                  {isExpanded ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
                </button>

                <div className={`flex flex-col gap-1 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`flex items-center gap-3 text-white no-underline font-medium transition-all duration-300 hover:text-(--color-primary) hover:bg-white/5 py-2 px-3 rounded-lg ${isActive(item.path)
                        ? 'text-(--color-primary) bg-white/5'
                        : 'text-gray-300'
                        }`}
                    >
                      <span className="shrink-0">{iconMap[item.icon]}</span>
                      <span className="text-sm whitespace-nowrap">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto w-full pt-6">
          <button
            onClick={handleLogout}
            className={`w-full px-4 py-2.5 rounded-lg text-white border-none cursor-pointer font-bold transition-all duration-300 hover:bg-[#6fb33d]/90 hover:shadow-lg active:scale-95 ${loggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: 'var(--color-primary)' }}
            disabled={loggingOut}
          >
            {loggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderACDesktop
