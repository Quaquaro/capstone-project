import TrackedGamesList from './TrackedGamesList.js';
export default {
  title: 'Component/TrackedGamesList',
  component: TrackedGamesList
};
const Template = (args) => <TrackedGamesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  nameOfGame: ['Name of game 1', 'Name of game 2', 'Name of game 3', 'Name of game 4']
};
