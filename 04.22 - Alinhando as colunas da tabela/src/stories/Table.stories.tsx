import { Story, Meta } from '@storybook/react';
import Table from '../components/Table/Table';

export default {
  title: 'Example/Table',
  component: Table,
} as Meta;

const Template: Story<{}> = (args) => <Table {...args} />;

export const Default = Template.bind({})
Default.args = {
}