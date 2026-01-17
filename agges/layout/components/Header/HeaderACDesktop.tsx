import React from 'react'
import Link from 'next/link'
import menu from '@/data/menu.json'
import { FaHome, FaUsers, FaFileAlt, FaFileInvoice } from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa6';

interface HeaderACDesktopProps {
  isActive: (path: string) => boolean;
  logout: () => void;
  userType: number; // 1 = admin, 0 = cliente
}

// Ya no se usa getUserType, el tipo de usuario viene por prop

// Mapeo de iconos string a componentes
const iconMap: Record<string, React.ReactNode> = {
  FaHome: <FaHome size={22} />,
  FaUsers: <FaUsers size={22} />,
  FaFileAlt: <FaFileAlt size={22} />,
  FaFileInvoice: <FaFileInvoice size={22} />,
  FaCalendar : <FaCalendar size={22} />,
};

// Define the type for menu items
interface MenuItem {
  path: string;
  name: string;
  icon: keyof typeof iconMap;
  admin: boolean;
}

const HeaderACDesktop = ({ isActive, logout, userType }: HeaderACDesktopProps) => {
  const filteredMenu = (menu as MenuItem[]).filter((item: MenuItem) => item.admin === (userType === 1));
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
    <header className="mr-40 fixed min-h-screen items-center bg-(--color-dark-gray) shadow-[0_2px_4px_rgba(0,0,0,0.2)] max-md:hidden w-auto">
      <div className='flex items-center content-center flex-col pt-10 pb-12 px-5 gap-12 min-h-screen'>
        <span className="text-white font-medium">{userType === 1 ? 'Administrador' : 'Cliente'}</span>
        <hr className="border-white w-full" />
        <nav className="flex flex-col gap-8">
          {filteredMenu.map((item: MenuItem) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 text-white no-underline font-medium transition-colors duration-300 hover:text-(--color-primary) ${
                isActive(item.path) ? 'text-(--color-primary)' : ''
              }`}
            >
              {iconMap[item.icon]}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded text-white border-none cursor-pointer font-bold transition-all duration-300 hover:bg-[#6fb33d] hover:-translate-y-0.5 ${loggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: 'var(--color-primary)' }}
            disabled={loggingOut}
          >
            {loggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderACDesktop