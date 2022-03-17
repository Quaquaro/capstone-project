import TrackGameOne from './TrackGameOne.js';
export default {
  title: 'Component/Form',
  component: TrackGameOne
};
const Template = (args) => <TrackGameOne {...args} />;

export const StepOne = Template.bind({});
StepOne.args = {};
