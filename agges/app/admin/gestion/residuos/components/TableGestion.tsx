
import type { ChartData } from 'chart.js';

type RegistroGestion = {
  material: string;
  [key: string]: string | number;
};

type Props = {
  registros: RegistroGestion[];
  treatmentKeys: string[];
  treatmentLabels: string[];
}

const TableGestion = ({ registros, treatmentKeys, treatmentLabels }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800">Matriz de Tratamiento de Materiales</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-100">Material</th>
              {treatmentLabels.map((head, i) => (
                <th
                  key={head}
                  className={
                    `px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border border-gray-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`
                  }
                >
                  {head}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider border border-gray-200 bg-gray-100">Total</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((row, idx) => {
              const rowTotal = treatmentKeys.reduce((acc, key) => acc + (row[key] || 0), 0);
              return (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                  <td className="px-6 py-3 font-semibold text-gray-800 text-sm whitespace-nowrap ">
                    {row.material}
                  </td>
                  {treatmentKeys.map((key) => (
                    <td
                      key={key}
                      className="px-4 py-3 text-center text-sm text-gray-700 border border-gray-200"
                    >
                      {row[key] && row[key] > 0 ? row[key] : <span className="text-gray-300">-</span>}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center font-bold text-gray-900 text-sm border border-gray-200">
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