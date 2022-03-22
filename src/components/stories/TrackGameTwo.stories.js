import TrackGameTwo from '../TrackGameTwo.js';
export default {
  title: 'Component/Form',
  component: TrackGameTwo
};
const Template = (args) => <TrackGameTwo {...args} />;

export const StepTwo = Template.bind({});
StepTwo.args = {
  nameOfGame: '',
  players: [
    { player: '', score: '' },
    { player: '', score: '' }
  ],
  isPlayersVisible: false
};
