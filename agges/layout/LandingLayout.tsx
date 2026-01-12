import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
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
