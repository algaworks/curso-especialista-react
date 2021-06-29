import { Story, Meta } from '@storybook/react';
import Chart, { ChartProps } from '../components/Chart/Chart';

export default {
  title: 'Example/Chart',
  component: Chart,
} as Meta;

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const Default = Template.bind({})
Default.args = {}