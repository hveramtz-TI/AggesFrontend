'use client'

import React from 'react'

interface SeparatorProps {
  imageUrl: string
}

const Separator: React.FC<SeparatorProps> = ({ imageUrl }) => {
  return (
    <div 
      className="w-full relative"
      style={{
        height: '30vh',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'rgba(41, 71, 17, 0.5)',
          zIndex: 1
        }}
      />
    </div>
  )
}

export default Separator
