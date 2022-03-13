import Notification from './Notification.js';
export default {
  title: 'Component/Alert',
  component: Notification
};
const Template = (args) => <Notification {...args} />;

export const Pink = Template.bind({});
Pink.args = {};
