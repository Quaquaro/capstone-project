import TrackedGamesList from './TrackedGamesList.js';
export default {
  title: 'Component/TrackedGamesList',
  component: TrackedGamesList
};
const Template = (args) => <TrackedGamesList {...args} />;

export const Default = Template.bind({});
Default.args = {};
