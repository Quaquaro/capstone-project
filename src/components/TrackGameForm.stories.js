import TrackGameForm from './TrackGameForm.js';
export default {
  title: 'Component/TrackGameForm',
  component: TrackGameForm
};
const Template = (args) => <TrackGameForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
