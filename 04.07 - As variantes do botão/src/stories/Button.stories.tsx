import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '../components/Button/Button';

export default {
  title: 'Example/Button',
  component: Button,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  label: 'Button',
};
export const Danger = Template.bind({});

Danger.args = {
  variant: 'danger',
  label: 'Button',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  label: 'Button',
};
