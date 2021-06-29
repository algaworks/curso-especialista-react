import { Story, Meta } from '@storybook/react';
import MarkdownEditor, { MarkdownEditorProps } from '../components/MarkdownEditor';

export default {
  title: 'Example/MarkdownEditor',
  component: MarkdownEditor,
} as Meta;

const Template: Story<MarkdownEditorProps> = (args) => <MarkdownEditor {...args} />;

export const Default = Template.bind({})
Default.args = {}