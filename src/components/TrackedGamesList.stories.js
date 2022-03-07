import TrackedGamesList from './TrackedGamesList.js';
export default {
  title: 'Component/TrackedGamesList',
  component: TrackedGamesList
};
const Template = (args) => <TrackedGamesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  games: [
    { nameOfGame: 'Colt Express', playerName: 'Chris', score: '45' },
    { nameOfGame: 'Colt Express', playerName: 'Chris', score: '45' }
  ]
};
