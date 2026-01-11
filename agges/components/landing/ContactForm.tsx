'use client'

import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    asunto: '',
    mensaje: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido'
    } else if (formData.mensaje.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simular envío (aquí irá la lógica real)
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      // Resetear form
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        asunto: '',
        mensaje: '',
      })

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section className="w-full py-24 px-8" style={{ backgroundColor: 'var(--color-light-green)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto */}
          <div>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 font-bold" style={{ color: 'var(--color-dark-gray)' }}>
                Contáctanos
              </h2>
              <div 
                className="w-24 h-1 rounded-full mb-6"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              <p 
                className="text-xl leading-relaxed mb-8"
                style={{ color: 'var(--color-dark-gray)', opacity: 0.8 }}
              >
                Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad.
              </p>
            </div>

            {/* Datos de contacto */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  📧
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--color-dark-gray)' }}>Email</h3>
                  <p style={{ color: 'var(--color-dark-gray)', opacity: 0.8 }}>
                    contacto@agges.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  📞
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--color-dark-gray)' }}>Teléfono</h3>
                  <p style={{ color: 'var(--color-dark-gray)', opacity: 0.8 }}>
                    +56 9 1234 5678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xl"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  📍
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--color-dark-gray)' }}>Dirección</h3>
                  <p style={{ color: 'var(--color-dark-gray)', opacity: 0.8 }}>
                    Av. Principal 123, Antofagasta, Chile
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2" style={{ borderColor: 'var(--color-light-gray)' }}>
            {submitSuccess && (
              <div 
                className="mb-6 p-4 rounded-lg text-white font-medium"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                ✓ ¡Mensaje enviado exitosamente! Te contactaremos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block mb-2 font-bold text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-4 border-2 rounded-xl focus:outline-none transition-colors duration-200"
                  style={{ 
                    borderColor: errors.nombre ? '#ef4444' : 'var(--color-light-gray)',
                    ...(formData.nombre && !errors.nombre && { borderColor: 'var(--color-primary)' })
                  }}
                  placeholder="Juan Pérez"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block mb-2 font-bold text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border-2 rounded-xl focus:outline-none transition-colors duration-200"
                  style={{ 
                    borderColor: errors.email ? '#ef4444' : 'var(--color-light-gray)',
                    ...(formData.email && !errors.email && { borderColor: 'var(--color-primary)' })
                  }}
                  placeholder="juan@ejemplo.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Teléfono y Empresa en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block mb-2 font-bold text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full p-4 border-2 rounded-xl focus:outline-none transition-colors duration-200"
                    style={{ 
                      borderColor: 'var(--color-light-gray)',
                      ...(formData.telefono && { borderColor: 'var(--color-primary)' })
                    }}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block mb-2 font-bold text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full p-4 border-2 rounded-xl focus:outline-none transition-colors duration-200"
                    style={{ 
                      borderColor: 'var(--color-light-gray)',
                      ...(formData.empresa && { borderColor: 'var(--color-primary)' })
                    }}
                    placeholder="Mi Empresa S.A."
                  />
                </div>
              </div>

              {/* Asunto */}
              <div>
                <label htmlFor="asunto" className="block mb-2 font-bold text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                  Asunto
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full p-4 border-2 rounded-xl focus:outline-none transition-colors duration-200 bg-white"
                  style={{ 
                    borderColor: 'var(--color-light-gray)',
                    ...(formData.asunto && { borderColor: 'var(--color-primary)' })
                  }}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="cotizacion">Solicitar Cotización</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block mb-2 font-bold text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-4 border-2 rounded-xl focus:outline-none transition-colors duration-200 resize-none"
                  style={{ 
                    borderColor: errors.mensaje ? '#ef4444' : 'var(--color-light-gray)',
                    ...(formData.mensaje && !errors.mensaje && { borderColor: 'var(--color-primary)' })
                  }}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
                {errors.mensaje && (
                  <p className="mt-1 text-sm text-red-500">{errors.mensaje}</p>
                )}
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm