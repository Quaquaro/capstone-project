import Loader from '../Loader.js';
export default {
  title: 'Component/Loader',
  component: Loader
};
const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};
