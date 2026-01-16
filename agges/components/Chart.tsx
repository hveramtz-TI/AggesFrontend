
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

// Registrar los elementos y escalas necesarios para evitar errores de runtime
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

type Props =
  | {
      type: 'bar';
      data: ChartData<'bar'>;
      options?: ChartOptions<'bar'>;
      height?: number;
      width?: number;
    }
  | {
      type: 'line';
      data: ChartData<'line'>;
      options?: ChartOptions<'line'>;
      height?: number;
      width?: number;
    }
  | {
      type: 'pie';
      data: ChartData<'pie'>;
      options?: ChartOptions<'pie'>;
      height?: number;
      width?: number;
    }
  | {
      type: 'doughnut';
      data: ChartData<'doughnut'>;
      options?: ChartOptions<'doughnut'>;
      height?: number;
      width?: number;
    };


const Chart = (props: Props) => {
  const { type, data, options } = props;
  // Forzar responsive y mantener aspect ratio
  const mergedOptions = {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
  };
  const style = { width: '100%', height: '350px', minHeight: 200 };
  switch (type) {
    case 'bar':
      return <div style={style}><Bar data={data} options={mergedOptions} /></div>;
    case 'line':
      return <div style={style}><Line data={data} options={mergedOptions} /></div>;
    case 'pie':
      return <div style={style}><Pie data={data} options={mergedOptions} /></div>;
    case 'doughnut':
      return <div style={style}><Doughnut data={data} options={mergedOptions} /></div>;
    default:
      return <div>Tipo de gráfico no soportado</div>;
  }
};

export default Chart;