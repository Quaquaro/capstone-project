import Button from '../DefaultButton.js';
export default {
  title: 'Component/Button',
  component: Button
};
const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};
