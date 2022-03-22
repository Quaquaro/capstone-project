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
        { player: 'Gustav', score: '5', id: '15' },
        { player: 'Gustav', score: '5', id: '16' },
        { player: 'Gustav', score: '5', id: '17' }
      ],
      id: '5',
      notes: 'Was für ein tolles Spiel!'
    },
    {
      nameOfGame: 'ColtExpress',
      players: [{ player: 'Gustav', score: '5', id: '45' }],
      id: '5',
      notes: 'Alleine ist irgendwie doof'
    }
  ]
};
