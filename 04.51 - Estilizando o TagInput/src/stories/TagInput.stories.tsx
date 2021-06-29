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

export const VariousTags = Template.bind({})
VariousTags.args = {
  placeholder: 'Insira as tags deste post',
  tags: [
    { id: '1', text: 'JavaScript' },
    { id: '2', text: 'Java' },
    { id: '3', text: 'Ruby on Rails' },
    { id: '4', text: 'Python' },
    { id: '5', text: 'JavaScript' },
    { id: '6', text: 'JavaScript' },
    { id: '7', text: 'JavaScript' },
  ]
}