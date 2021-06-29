import Chart from "../components/Chart/Chart"

const FAKE_DATA = {
  labels: ['Batata', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  datasets: [
    {
      label: 'Receitas',
      data: [500, 400, 600, 100, 800, 20, 123, 320, 120, 500, 434, 322],
      fill: true,
      backgroundColor: '#0099FF',
      borderColor: '#0099FF',
      borderWidth: 0.5,
      yAxisID: 'cashflow',
    },
    {
      label: 'Despesas',
      data: [100, 200, 250, 500, 1000, 600, 123, 210, 344, 800, 123, 0],
      fill: true,
      backgroundColor: '#274060',
      borderColor: '#274060',
      borderWidth: 0.5,
      yAxisID: 'cashflow',
    },
  ]
}

export default function UserMetrics () {
  return <Chart
    title="Média de performance nos últimos 12 meses"
    data={FAKE_DATA}
  />
}