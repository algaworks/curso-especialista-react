import { Story, Meta } from '@storybook/react';
import Input, { InputProps } from '../components/Input/Input';

export default {
  title: 'Example/Input',
  component: Input,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: 'e.g.: Jon Doe'
}

export const WithLabelAndPlaceholder = Template.bind({})
WithLabelAndPlaceholder.args = {
  label: 'Name',
  placeholder: 'e.g.: Jon Doe'
}

export const WithLabelAndContent = Template.bind({})
WithLabelAndContent.args = {
  label: 'Name',
  value: 'Jon Doe'
}

export const WithContent = Template.bind({})
WithContent.args = {
  value: 'Jon Doe'
}
