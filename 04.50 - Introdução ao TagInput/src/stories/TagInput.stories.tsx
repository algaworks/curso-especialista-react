import { Story, Meta } from '@storybook/react';
import TagInput, { TagInputProps } from '../components/TagInput';

export default {
  title: 'Example/TagInput',
  component: TagInput,
} as Meta;

const Template: Story<TagInputProps> = (args) =>
  <div>
    <TagInput {...args} />
  </div>

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Insira as tags deste post',
  tags: [{ id: '1', text: 'JavaScript' }]
}