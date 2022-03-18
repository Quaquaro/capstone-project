import TrackGameTwo from './TrackGameTwo.js';
export default {
  title: 'Component/Form',
  component: TrackGameTwo
};
const Template = (args) => <TrackGameTwo {...args} />;

export const StepTwo = Template.bind({});
StepTwo.args = {
  gameData: {
    nameOfGame: '',
    playerNameOne: '',
    scoreOne: '',
    playerNameTwo: '',
    scoreTwo: '',
    playerNameThree: '',
    scoreThree: '',
    playerNameFour: '',
    scoreFour: '',
    isPlayersVisible: false
  }
};
