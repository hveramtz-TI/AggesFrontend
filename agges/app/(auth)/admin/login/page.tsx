'use client'

import React from 'react'
import { useAuth, useForm } from '@/hooks'

interface LoginFormValues {
  rut: string
  password: string
}

export default function AdminLoginPage() {
  const { login, loading, error, setError } = useAuth()

  const {
    values,
    errors: formErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm<{ rut: string; password: string }>({
    initialValues: {
      rut: '',
      password: ''
    },
    validate: (values) => {
      const errors: Partial<Record<'rut' | 'password', string>> = {}
      if (!values.rut) {
        errors.rut = 'El RUT es requerido'
      } else if (!/^\d+$/.test(values.rut)) {
        errors.rut = 'Solo se permiten números'
      }
      if (!values.password) {
        errors.password = 'La contraseña es requerida'
      } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
      }
      return errors
    },
    onSubmit: async (values) => {
      setError('')
      await login(values, 1) // tipo 1 = admin
    }
  })

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[var(--color-dark-gray)] px-4">
      <div className="w-full h-auto max-w-[450px] bg-white rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.15)] p-8 max-md:p-6 max-[480px]:p-6 overflow-y-auto">
        <h2 className="text-[2rem] max-md:text-[1.5rem] max-[480px]:text-[1.25rem] font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>
          Administrador
        </h2>

        {error && (
          <div className="bg-[rgba(220,53,69,0.1)] text-[#c82333] p-4 rounded-lg mb-6 border-2 border-[rgba(220,53,69,0.3)] font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="rut" className="block mb-2 text-[var(--color-dark-gray)] font-bold text-[0.9rem]">
              RUT
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9.\-kK]*"
              id="rut"
              name="rut"
              placeholder="12.345.678-9"
              value={values.rut}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className="w-full px-4 py-4 border-2 border-[var(--color-light-gray)] rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(131,202,74,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {touched.rut && formErrors.rut && (
              <span className="text-[#c82333] text-sm mt-2 block font-medium">
                {formErrors.rut}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="block mb-2 text-[var(--color-dark-gray)] font-bold text-[0.9rem]">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className="w-full px-4 py-4 border-2 border-[var(--color-light-gray)] rounded-lg text-base transition-all duration-300 focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(131,202,74,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {touched.password && formErrors.password && (
              <span className="text-[#c82333] text-sm mt-2 block font-medium">
                {formErrors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 border-none rounded-lg cursor-pointer text-base font-bold text-white mt-4 transition-all duration-300 hover:bg-[#6fb33d] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(131,202,74,0.3)] disabled:bg-[var(--color-light-gray)] disabled:text-[var(--color-dark-gray)] disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none disabled:shadow-none"
            style={{ backgroundColor: loading ? undefined : 'var(--color-primary)' }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
