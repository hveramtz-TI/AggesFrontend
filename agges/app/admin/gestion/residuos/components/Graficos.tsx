"use client"
import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('../../../../../components/Chart'), { ssr: false })


import { ChartOptions, ChartData } from 'chart.js';

type Props = {
  listadoPorcentajeMateriales: ChartData<'pie', number[], string>;
  pieOptions: ChartOptions<'pie'>;
  stackedBarData: ChartData<'bar', number[], string>;
  stackedBarOptions: ChartOptions<'bar'>;
}

const Graficos = ({ listadoPorcentajeMateriales, pieOptions, stackedBarData, stackedBarOptions}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--card-border)] p-6 lg:col-span-1">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-6">Distribución Total (Kg)</h3>
        <div className="h-fit relative">
          <Chart type="pie" data={listadoPorcentajeMateriales} options={pieOptions} />
        </div>
      </div>

      <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--card-border)] p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-[var(--foreground)] mb-6">Materiales por Tipo de Tratamiento</h3>
        <div className="h-fit relative">
          <Chart type="bar" data={stackedBarData} options={stackedBarOptions} />
        </div>
      </div>

      <div></div>
    </div>
  )
}

export default Graficos