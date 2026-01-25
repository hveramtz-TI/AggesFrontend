"use client"
import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('../../../../../components/Chart'), { ssr: false })

type Props = {
  listadoPorcentajeMateriales: any
  pieOptions: any
  stackedBarData: any
  stackedBarOptions: any
}

const Graficos = ({ listadoPorcentajeMateriales, pieOptions, stackedBarData, stackedBarOptions }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Distribución Total (Kg)</h3>
        <div className="h-[280px] relative">
          <Chart type="pie" data={listadoPorcentajeMateriales} options={pieOptions} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Materiales por Tipo de Tratamiento</h3>
        <div className="h-[280px]">
          <Chart type="bar" data={stackedBarData} options={stackedBarOptions} />
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default Graficos