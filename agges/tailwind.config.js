/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

const config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layout/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#83CA4A',
                white: '#FFFFFF',
                'light-gray': '#EFEFEF',
                'dark-gray': '#383838',
                'light-green': '#F4FBEF',
                // Puedes agregar más colores personalizados aquí si lo necesitas
            },
            fontFamily: {
                primary: ['Montserrat', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            fontWeight: {
                bold: 700,
                medium: 500,
            },
        },
    },
    plugins: [flowbitePlugin],
};

export default config;
