import React from 'react'

type Props = {
  registros: any[]
  treatmentKeys: string[]
  treatmentLabels: string[]
}

const TableGestion = ({ registros, treatmentKeys, treatmentLabels }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">Matriz de Tratamiento de Materiales</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Material</th>
              {treatmentLabels.map(head => (
                <th key={head} className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
              <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {registros.map((row, idx) => {
              const rowTotal = treatmentKeys.reduce((acc, key) => acc + row[key], 0)
              return (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-700 text-sm whitespace-nowrap">{row.material}</td>
                  {treatmentKeys.map((key) => (
                    <td key={key} className="px-4 py-4 text-center text-sm text-gray-600">
                      {row[key] > 0 ? row[key] : <span className="text-gray-300">-</span>}
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center bg-gray-50 font-bold text-gray-800 text-sm">
                    {rowTotal}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableGestion