import Dialog from './Dialog.js';
export default {
  title: 'Component/Dialog',
  component: Dialog
};
const Template = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = { message: 'Hello?', nameOfGame: 'Game' };
