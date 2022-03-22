import Input from '../Input.js';
export default {
  title: 'Component/Input',
  component: Input
};
const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};
