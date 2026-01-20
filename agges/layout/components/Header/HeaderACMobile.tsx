import Link from 'next/link'
import {
	FaHome,
	FaFileAlt,
	FaFileInvoice,
	FaSignOutAlt,
	FaBars,
	FaTimes,
	FaUsers,
	FaRecycle,
	FaCalendarAlt,
	FaFileContract,
	FaBoxes,
	FaBriefcase,
	FaMapMarkedAlt,
	FaMapPin
} from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa6';
import React from 'react'
import { menu } from '@/data/menu'

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
	FaUsers: <FaUsers size={22} />,
	FaFileAlt: <FaFileAlt size={22} />,
	FaFileInvoice: <FaFileInvoice size={22} />,
	FaRecycle: <FaRecycle size={22} />,
	FaCalendarAlt: <FaCalendarAlt size={22} />,
	FaFileContract: <FaFileContract size={22} />,
	FaBoxes: <FaBoxes size={22} />,
	FaBriefcase: <FaBriefcase size={22} />,
	FaMapMarkedAlt: <FaMapMarkedAlt size={22} />,
	FaMapPin: <FaMapPin size={22} />,
	FaCalendar: <FaCalendar size={22} />,
};

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

const HeaderACMobile = ({ isActive, logout, open, setOpen, userType }: HeaderACMobileProps) => {
	const role = userType === 1 ? 'admin' : 'client';
	const filteredMenu = (menu as MenuSection[]).filter((section) => section.roles.includes(role));

	// Estado para secciones expandidas
	const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>(
		filteredMenu.reduce((acc, section) => ({ ...acc, [section.section]: true }), {})
	);

	const toggleSection = (sectionName: string) => {
		setExpandedSections(prev => ({
			...prev,
			[sectionName]: !prev[sectionName]
		}));
	};

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
				<nav className="md:hidden fixed top-0 left-0 h-full gap-4 flex flex-col py-24 px-6 bg-(--color-dark-gray) border-r border-gray-700 w-fit z-40 transition-all duration-300 overflow-y-auto">
					{filteredMenu.map((section) => {
						const isExpanded = expandedSections[section.section];
						return (
							<div key={section.section} className="flex flex-col gap-3">
								<button
									onClick={() => toggleSection(section.section)}
									className="flex items-center justify-center p-1 text-gray-400 focus:outline-none bg-transparent border-none cursor-pointer"
									title={section.section}
								>
									<span className="text-[8px] uppercase font-bold opacity-50">
										{section.section.substring(0, 3)}
									</span>
								</button>

								<div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
									}`}>
									{section.items.map((item) => (
										<Link
											key={item.path}
											href={item.path}
											className={`flex flex-col items-center text-white no-underline text-xs font-medium transition-colors duration-300 ${isActive(item.path) ? 'text-(--color-primary)' : ''
												}`}
											aria-label={item.name}
											onClick={() => setOpen(false)}
										>
											{iconMap[item.icon]}
										</Link>
									))}
								</div>
								<hr className="border-white opacity-5 w-full" />
							</div>
						);
					})}
					<button
						onClick={() => { if (logout) logout(); setOpen(false); }}
						className="flex flex-col items-center text-white no-underline text-sm font-medium focus:outline-none border-none bg-transparent mt-auto pt-6"
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
