import { Story, Meta } from '@storybook/react';
import Chart, { ChartProps } from '../components/Chart/Chart';

const data: Chart.ChartData = {
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

export default {
  title: 'Example/Chart',
  component: Chart,
} as Meta;

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const Default = Template.bind({})
Default.args = {
  title: 'Média de performance nos últimos 12 meses',
  data
}

export const WithoutData = Template.bind({})
WithoutData.args = {
  title: 'Média de performance nos últimos 6 meses'
}