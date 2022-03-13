import Alert from './Alert.js';
export default {
  title: 'Component/Alert',
  component: Alert
};
const Template = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {};
