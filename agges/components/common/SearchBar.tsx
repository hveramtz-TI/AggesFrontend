import React from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ value, onChange, placeholder = 'Buscar...', className = '' }: SearchBarProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <input
        type="text"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(131,202,74,0.1)] transition-all"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
