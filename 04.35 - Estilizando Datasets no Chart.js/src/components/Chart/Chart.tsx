import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Receitas',
      data: [500, 400, 600, 100, 800, 20],
      fill: true,
      backgroundColor: '#0099FF',
      borderColor: 'transparent',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Despesas',
      data: [1, 2, 1, 1, 2, 2],
      fill: true,
      backgroundColor: '#274060',
      borderColor: 'transparent',
      yAxisID: 'y-axis-2',
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
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
      },
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