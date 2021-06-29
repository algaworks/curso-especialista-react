import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Receitas',
      data: [500, 400, 600, 100, 800, 20],
      fill: true,
      backgroundColor: '#0099FF',
      borderColor: '#0099FF',
      borderWidth: 0.5,
      yAxisID: 'cashflow',
    },
    {
      label: 'Despesas',
      data: [100, 200, 250, 500, 1000, 600],
      fill: true,
      backgroundColor: '#274060',
      borderColor: '#274060',
      borderWidth: 0.5,
      yAxisID: 'cashflow',
    },
  ],
};

const options: Chart.ChartOptions = {
  maintainAspectRatio: false,
  elements: {
    line: {
      tension: 0
    }
  },
  legend: {
    display: true,
    position: 'bottom',
    align: 'center',
    labels: {
      usePointStyle: true
    }
  },
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'cashflow',
      }
    ],
  },
};

export interface ChartProps {}

export default function Chart () {
  return <div>
    <Line
      type="line"
      height={250}
      data={data}
      options={options}
    />
  </div>
}