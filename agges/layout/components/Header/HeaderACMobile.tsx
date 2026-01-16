
import Link from 'next/link'
import { FaHome, FaFileAlt, FaFileInvoice, FaSignOutAlt, FaBars, FaTimes, FaUsers } from 'react-icons/fa'
import React from 'react'
import menu from '@/data/menu.json'

interface HeaderACMobileProps {
	isActive: (path: string) => boolean;
	logout?: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	userType: number; // 1 = admin, 0 = cliente
}


// Mapeo de iconos string a componentes
const iconMap: Record<string, React.ReactNode> = {
	FaHome: <FaHome size={22} />,
	FaFileAlt: <FaFileAlt size={22} />,
	FaFileInvoice: <FaFileInvoice size={22} />,
	FaUsers: <FaUsers size={22} />,
};

interface MenuItem {
	path: string;
	name: string;
	icon: keyof typeof iconMap;
	admin: boolean;
}

const HeaderACMobile = ({ isActive, logout, open, setOpen, userType }: HeaderACMobileProps) => {
	const filteredMenu = (menu as MenuItem[]).filter((item: MenuItem) => item.admin === (userType === 1));

	return (
		<>
			{/* Botón hamburguesa */}
			<button
				className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center p-2 rounded bg-(--color-dark-gray) text-white"
				onClick={() => setOpen(!open)}
				aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
				type="button"
			>
				{open ? <FaTimes size={24} /> : <FaBars size={24} />}
			</button>
			{/* Menú lateral móvil */}
			{open && (
				<nav className="md:hidden fixed top-0 left-0 h-full gap-10 flex flex-col py-30 px-7 bg-(--color-dark-gray) border-r border-gray-700 w-fit z-40 transition-all duration-300">
					{filteredMenu.map((item: MenuItem) => (
						<Link
							key={item.path}
							href={item.path}
							className={`flex flex-col items-center text-white no-underline text-sm font-medium ${
								isActive(item.path) ? 'text-(--color-primary)' : ''
							}`}
							aria-label={item.name}
							onClick={() => setOpen(false)}
						>
							{iconMap[item.icon]}
						</Link>
					))}
					<button
						onClick={() => { logout && logout(); setOpen(false); }}
						className="flex flex-col items-center text-white no-underline text-sm font-medium focus:outline-none border-none bg-transparent mt-auto"
						aria-label="Cerrar sesión"
						type="button"
					>
						<FaSignOutAlt size={22} />
					</button>
				</nav>
			)}
		</>
	);
}

export default HeaderACMobile
