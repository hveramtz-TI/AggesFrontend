import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow px-8" style={{ backgroundColor: 'var(--color-light-green)' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
