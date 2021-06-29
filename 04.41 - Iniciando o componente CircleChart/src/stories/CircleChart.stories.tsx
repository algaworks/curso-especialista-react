import { Story, Meta } from '@storybook/react';
import CircleChart, { CircleChartProps } from '../components/CircleChart';

export default {
  title: 'Example/CircleChart',
  component: CircleChart,
} as Meta;

const Template: Story<CircleChartProps> = (args) => <CircleChart {...args} />;

export const Default = Template.bind({})
Default.args = {}