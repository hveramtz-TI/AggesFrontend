"use client"
import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

interface LandingLayoutProps {
  children: React.ReactNode;
}


const LandingLayout = ({ children }: LandingLayoutProps) => {
  React.useEffect(() => {
    // Forzar modo claro en la landing removiendo la clase dark
    document.documentElement.classList.remove('dark');
  }, []);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow " style={{ backgroundColor: 'var(--color-light-green)' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default LandingLayout
