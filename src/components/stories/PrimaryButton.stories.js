import Primary from '../PrimaryButton.js';
export default {
  title: 'Component/Button',
  component: Primary
};
const Template = (args) => <Primary {...args} />;

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {};
