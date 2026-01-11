'use client'

import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

const Header = () => {
  return (
    <header className='w-full bg-white shadow-md sticky top-0 z-[100]'>
      <div className="hidden md:block">
        <HeaderDesktop />
      </div>
      <div className="block md:hidden">
        <HeaderMobile />
      </div>
    </header>
  )
}

export default Header