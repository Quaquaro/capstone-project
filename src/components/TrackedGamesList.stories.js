import TrackedGamesList from './TrackedGamesList.js';
export default {
  title: 'Component/TrackedGamesList',
  component: TrackedGamesList
};
const Template = (args) => <TrackedGamesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  games: [
    {
      nameOfGame: '7Wonders',
      players: [
        { player: 'Gustav', score: '5' },
        { player: 'Gustav', score: '5' },
        { player: 'Gustav', score: '5' }
      ],
      id: '5'
    },
    { nameOfGame: 'ColtExpress', players: [{ player: 'Gustav', score: '5' }], id: '5' }
  ]
};
