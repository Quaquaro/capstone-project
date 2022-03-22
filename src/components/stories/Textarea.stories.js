import Textarea from '../Textarea.js';
export default {
  title: 'Component/Textarea',
  component: Textarea
};
const Template = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {};
